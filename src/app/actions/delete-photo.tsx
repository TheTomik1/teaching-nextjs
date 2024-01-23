'use server'

import { revalidatePath } from 'next/cache'
import { createDB } from '../../lib/db'

type DeleteImageParams = {
  id: number
  productId: number
}

export async function deleteImage(image: DeleteImageParams) {
  const db = createDB()

  console.log(image)

  await db.deleteFrom('productsPhotos').where('id', '=', image.id).execute()

  revalidatePath(`/product-edit/${image.productId}`)
}
