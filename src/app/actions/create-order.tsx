'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../../lib/db'
import { revalidatePath } from 'next/cache'
import { sql } from 'kysely'

type ItemProps = {
  id: number
  count: number
  name: string
  price: number
  imageUrl: string
}

type createOrderParams = {
  items: ItemProps[]
}

export async function createOrder(order: createOrderParams) {
  const db = createDB()

  const orderData = await db
    .insertInto('orders')
    .expression(sql`default values`)
    .returningAll()
    .executeTakeFirstOrThrow()

  const orderId = orderData.id

  for (const product of order.items) {
    await db
      .insertInto('ordersProducts')
      .values({ orderId: orderId, productId: product.id, count: product.count, price: product.price })
      .execute()
  }

  revalidatePath('/orders')
  redirect('/orders')
}
