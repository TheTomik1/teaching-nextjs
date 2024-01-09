'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../../lib/db'

type EditProductParams = {
  id: number
  name: string
  description: string
  price: number
}

export async function editProduct(product: EditProductParams) {
  const db = createDB()

  const newProduct = await db
    .updateTable('products')
    .set({ name: product.name, description: product.description, price: product.price })
    .where('id', '=', product.id)
    .executeTakeFirstOrThrow()

  redirect(`/product/${product.id}`)
}
