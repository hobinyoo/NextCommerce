// import ImageGallery from 'react-image-gallery'
import Carousel from 'nuka-carousel/lib/carousel'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomEditor from '@components/Editor'
import { useRouter } from 'next/router'
import { convertFromRaw, EditorState } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { products } from '@prisma/client'
import { format } from 'date-fns'
import { CATEGORY_MAP } from 'constants/products'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@mantine/core'
import IconHeart from '../../../public/Heart.svg'
import IconHeartbeat from '../../../public/Heartbeat.svg'
import { useSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(
    `http://localhost:3000/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items)
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  }
}

const WISHLIST_QUERY_KEY = '/api/get-wishlist'
export default function Products(props: {
  product: products & { images: string[] }
}) {
  const [index, setIndex] = useState(0)
  const { data: session } = useSession()
  const router = useRouter()
  const { id: productId } = router.query

  const [editorState] = useState<EditorState | undefined>(() =>
    props.product?.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  )

  const { data: wishlist } = useQuery([WISHLIST_QUERY_KEY], () =>
    fetch(WISHLIST_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items)
  )

  const { mutate } = useMutation((productId) =>
    fetch('/api/update-wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json())
      .then((data) => data.items)
  )

  const product = props.product

  const isWished = wishlist ? wishlist.includes(productId) : false
  return (
    <>
      {product != null && productId != null ? (
        <div className="p-24 flex flex-row">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="fade"
              withoutControls={true}
              autoplay
              wrapAround
              speed={10}
              slideIndex={index}
            >
              {product?.images.map((url, idx) => (
                <Image
                  key={`url-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={600}
                  height={600}
                />
              ))}
            </Carousel>
            <div className="flex space-x-4 mt-2">
              {product?.images.map((url, idx) => (
                <div key={`url-thumb-${idx}`} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={100} height={100} />
                </div>
              ))}
            </div>
            {editorState != null && (
              <CustomEditor editorState={editorState} readOnly />
            )}
          </div>
          <div style={{ maxWidth: 600 }} className="flex flex-col space-y-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-4xl font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')}원
            </div>
            <>{wishlist}</>

            <Button
              leftIcon={
                isWished ? <IconHeartbeat size={20} /> : <IconHeart size={20} />
              }
              style={{ backgroundColor: isWished ? 'red' : 'gray' }}
              radius="xl"
              size="md"
              styles={{
                root: { paddingRight: 14, height: 48 },
              }}
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요해요')
                  router.push('auth/login')
                  return
                }
                mutate(String(productId))
              }}
            >
              찜하기
            </Button>
            <div className="text-sm text-zinc-300">
              등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  )
}
