'use server'

import { revalidatePath } from 'next/cache'
import { createDB } from '../../lib/db'

type AddPhotoParams = {
  productId: number
  url: string
}

export async function addPhoto(image: AddPhotoParams) {
  const db = createDB()

  await db
    .insertInto('productsPhotos')
    .values({
      productId: image.productId,
      url: image.url,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/product-edit/${image.productId}`)
}
