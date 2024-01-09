'use server'

import { revalidatePath } from 'next/cache'
import { createDB } from '../../lib/db'

type CreateProducReviewsParams = {
  rating: number
  content: string
  username: string
}

export async function createProductReview(review: CreateProducReviewsParams, productId: number) {
  const db = createDB()

  const newProduct = await db
    .insertInto('productsReviews')
    .values({
      productId: productId,
      rating: review.rating,
      content: review.content,
      username: review.username,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/product/${productId}`)
}
