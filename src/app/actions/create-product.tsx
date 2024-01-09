'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../../lib/db'

type CreateProductParams = {
  name: string
  description: string
  price: number
}

export async function createProduct(product: CreateProductParams) {
  const db = createDB()

  const newProduct = await db
    .insertInto('products')
    .values({
      name: product.name,
      description: product.description,
      price: product.price,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  redirect(`/product/${newProduct.id}`)
}
