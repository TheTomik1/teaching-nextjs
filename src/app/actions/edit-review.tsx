'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../../lib/db'
import { revalidatePath } from 'next/cache'

type EditReviewParams = {
  id: number
  rating: number
  content: string | null
  username: string
}

export async function editReview(review: EditReviewParams) {
  const db = createDB()

  const updatedProductReview = await db
    .updateTable('productsReviews')
    .set({ rating: review.rating, content: review.content, username: review.username })
    .where('id', '=', review.id)
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/product/${updatedProductReview.productId}`)
}
