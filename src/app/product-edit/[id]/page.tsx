import EditProduct from '../../../components/EditProduct'
import ListAndDeleteImages from '../../../components/ListAndDeleteImages'

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

async function getProductImages(id: number) {
  const db = createDB()

  const productImages = await db.selectFrom('productsPhotos').selectAll().where('productId', '=', id).execute()
  return productImages
}

export default async function ProductEditPage({ params }: ProductEditPageProps) {
  const productId = parseInt(params.id)
  const product = await getProductDetail(productId)
  const productImages = await getProductImages(productId)

  console.log(productId)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <EditProduct id={productId} name={product.name} description={product.description} price={product.price} />
      <ListAndDeleteImages productId={productId} imagesList={productImages} />
    </main>
  )
}
