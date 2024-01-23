import EditProduct from '../../../components/EditProduct'
import ListAndDeletePhotos from '../../../components/ListAndDeletePhotos'

import { createDB } from '../../../lib/db'

type ProductEditPageProps = {
  params: {
    id: string
  }
}

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirstOrThrow()

  return product
}

async function getProductPhotos(id: number) {
  const db = createDB()

  const productsPhotos = await db.selectFrom('productsPhotos').selectAll().where('productId', '=', id).execute()

  return productsPhotos
}

export default async function ProductEditPage({ params }: ProductEditPageProps) {
  const productId = parseInt(params.id)
  const product = await getProductDetail(productId)
  const productPhotos = await getProductPhotos(productId)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <EditProduct id={productId} name={product.name} description={product.description} price={product.price} />
      <ListAndDeletePhotos photoDetails={productPhotos} productId={productId} />
    </main>
  )
}
