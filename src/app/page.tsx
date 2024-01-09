import { redirect } from 'next/navigation'
import { ProductList } from '../components/ProductList'

type Props = {
  searchParams: { page?: string }
}

export default function Home({ searchParams }: Props) {
  let pageId = searchParams.page
  if (pageId == null || pageId === '') {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>Products List:</div>
        <ProductList pageId={1} />
      </main>
    )
  }
  if (typeof pageId === 'string') {
    if (parseInt(pageId) <= 0) {
      redirect('?page=1')
    }

    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>Products List:</div>
        <ProductList pageId={parseInt(pageId)} />
      </main>
    )
  }
}
