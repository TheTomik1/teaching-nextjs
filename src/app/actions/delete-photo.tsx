'use server'

import { revalidatePath } from 'next/cache'
import { createDB } from '../../lib/db'

type DeletePhotoParams = {
  id: number
  productId: number
}

export async function deletePhoto(photo: DeletePhotoParams) {
  const db = createDB()

  console.log(photo)

  await db.deleteFrom('productsPhotos').where('id', '=', photo.id).execute()

  revalidatePath(`/product-edit/${photo.productId}`)
}
