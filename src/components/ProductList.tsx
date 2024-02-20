import { createDB } from '../lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import notFoundImage from '../../public/Image_not_available.png'

import { AddToCardButton } from './AddToCardButton'

async function getProducts(page: number) {
  const db = createDB()

  const products = await db
    .selectFrom('products')
    .leftJoin('productsPhotos', 'productsPhotos.productId', 'products.id')
    .groupBy(['products.id', 'products.name', 'products.price'])
    .select(['products.id', 'products.name', 'products.description', 'productsPhotos.url'])
    .offset((page - 1) * 9)
    .limit(9)
    .execute()

  return products
}

type ProductProps = {
  id: number
  name: string
  description: string
  url: string | null
}

function Product(props: ProductProps) {
  const { name, description, url } = props

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="text-lg font-semibold">{name}</div>
      <div className="mb-12">{description}</div>
      <Image
        src={url ? url : notFoundImage}
        alt={'Product image'}
        className="rounded-xl mb-12 w-full"
        width={256}
        height={256}
      />
      <div className="space-x-4">
        <Link
          href={`/product/${props.id}`}
          className="bg-green-500 p-4 rounded-xl hover:bg-green-700 transition-transform"
        >
          Details
        </Link>
        <Link
          href={`/product-edit/${props.id}`}
          className="bg-blue-500 p-4 rounded-xl hover:bg-blue-700 transition-transform"
        >
          Edit
        </Link>
        <AddToCardButton id={props.id} />
      </div>
    </div>
  )
}

type PageProps = {
  pageId: number
}

export async function ProductList(props: PageProps) {
  const products = await getProducts(props.pageId)
  if (products.length === 0) {
    redirect(`?page=${props.pageId - 1}`)
  }

  return (
    <div>
      <Link href="/cart" className="bg-green-500 p-4 text-white rounded-xl">
        Cart
      </Link>

      <div className="grid grid-cols-3 gap-4 mt-12">
        {products.map((p) => (
          <Product key={p.id} id={p.id} name={p.name} description={p.description} url={p.url} />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Link
          href={`?page=${props.pageId - 1}`}
          className="bg-blue-500 p-4 rounded-xl text-white font-semibold hover:bg-blue-700 transition-transform"
        >
          Previous
        </Link>
        <Link
          href={`?page=${props.pageId + 1}`}
          className="bg-blue-500 p-4 rounded-xl text-white font-semibold hover:bg-blue-700 transition-transform"
        >
          Next
        </Link>
      </div>
    </div>
  )
}
