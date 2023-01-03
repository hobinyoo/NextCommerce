import type { NextApiRequest, NextApiResponse } from 'next'
// import { Client } from '@notionhq/client'

// const notion = new Client({
//   auth: 'secret_ABVM05oTw6tMxoHsD5BOjV527bnFdC65jq2JhHsFI7g',
// })

const databaseId = 'da297f5052c541c18ade27170449f42f'

async function getItem() {
  try {
    // const response = await notion.databases.query({
    //   database_id: databaseId,
    //   sorts: [
    //     {
    //       property: 'price',
    //       direction: 'ascending',
    //     },
    //   ],
    // })
    // console.log(response)
    // return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await getItem()
    // res.status(200).json({ items: response?.results, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
