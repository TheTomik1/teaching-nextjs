'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../../lib/db'
import { revalidatePath } from 'next/cache'

type createOrderParams = {
  totalPrice: number
  totalCount: number
}

export async function createOrder(order: createOrderParams) {
  const db = createDB()

  await db
    .insertInto('orders')
    .values({ totalPrice: order.totalPrice, totalCount: order.totalCount })
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath('/orders')
  redirect('/orders')
}
