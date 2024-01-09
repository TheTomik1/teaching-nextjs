import { ProductDetail } from '../../../components/ProductDetail'

type ProductDetailPageProps = {
  params: {
    id: string
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Product Detail: {productId}</div>
      <ProductDetail id={productId} />
    </main>
  )
}
