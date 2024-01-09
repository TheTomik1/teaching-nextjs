import { createDB } from '../lib/db'
import { MessagesList } from './MessagesList'

async function getProducts() {
  const db = createDB()

  const products = await db.selectFrom('products').selectAll().execute()
  return products
}

export async function StaticMessages() {
  const products = await getProducts()

  return <MessagesList messages={products} />
}
