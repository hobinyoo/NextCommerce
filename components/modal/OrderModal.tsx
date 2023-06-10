import { CountControl } from '@components/CountControl'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  orderVisible: boolean
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const OrderModal = ({ orderVisible, setOrderVisible }: Props) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState<number | undefined>(1)

  return (
    <div css={overlay} onClick={() => setOrderVisible(false)}>
      <div css={orderModal}>
        <div css={modalInner}>
          <div className="text-lg">
           
          </div>
          <span>수량</span>
          <CountControl value={quantity} setValue={setQuantity} max={200} />
          <Button onClick={() => router.push('/order')} order>
            주문하기
          </Button>
        </div>
      </div>
    </div>
  )
}

const overlay = css`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검은 배경 */
  z-index: 9999; /* 다른 요소들보다 위에 나타나도록 높은 값 설정 */
  display: flex;
`
const orderModal = css`
  width: 100%;
  height: 418px;
  background-color: white;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
`

const modalInner = css`
  padding: 2rem;
`
export default OrderModal