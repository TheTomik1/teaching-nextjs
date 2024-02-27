'use server'

import { createDB } from '../../lib/db'

export async function productDetails(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').where('id', '=', id).selectAll().executeTakeFirstOrThrow()

  const productPhotos = await db.selectFrom('productsPhotos').where('productId', '=', id).selectAll().execute()

  return { ...product, photos: productPhotos }
}
