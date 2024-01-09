import Image from 'next/image'

import CreateProductReview from './CreateProductReview'

import { createDB } from '../lib/db'

import notFoundImage from '../../public/Image_not_available.png'

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirstOrThrow()

  return product
}

async function getProductReviews(id: number) {
  const db = createDB()

  const reviews = await db.selectFrom('productsReviews').selectAll().where('productId', '=', id).execute()

  return reviews
}

async function getProductImages(id: number) {
  const db = createDB()

  const images = await db.selectFrom('productsPhotos').selectAll().where('productId', '=', id).execute()

  return images
}

type ProductDetailProps = {
  id: number
}

export async function ProductDetail({ id }: ProductDetailProps) {
  const product = await getProductDetail(id)
  const reviews = await getProductReviews(id)
  const images = await getProductImages(id)

  return (
    <div>
      <p className="text-4xl text-amber-500 font-bold">{product.name}</p>
      <div className="text-sm p-2 rounded-xl text-white bg-gray-600 w-24 mt-4 hover:scale-110 transition-transform cursor-pointer">
        {product.price} €
      </div>
      <div className="mt-4">
        {images.length > 0 ? (
          images.map((im) => (
            <div key={im.id}>
              <img className="rounded-xl mb-12 shadow-xl " src={im.url} />
            </div>
          ))
        ) : (
          <Image src={notFoundImage} alt={'Image not found'} />
        )}
      </div>
      <div>
        {reviews.map((pr) => (
          <div
            className="bg-gray-300 p-4 rounded-xl mt-4 cursor-pointer hover:scale-105 transition-transform"
            key={pr.id}
          >
            {pr.username} has commented "{pr.content}" with {pr.rating}/5 rating.
          </div>
        ))}
      </div>
      <CreateProductReview productId={product.id} />
    </div>
  )
}
