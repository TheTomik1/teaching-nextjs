import { sql } from 'kysely'
import { createDB } from '../../../lib/db'

type OrderDetailPageProps = {
  params: {
    id: string
  }
}

export default async function OrderDetails({ params }: OrderDetailPageProps) {
  const orderId = parseInt(params.id)

  const db = createDB()

  const details = await db
    .selectFrom('orders')
    .leftJoin('ordersProducts', 'ordersProducts.orderId', 'orders.id')
    .groupBy(['orderId'])
    .select(({ fn, ref }) => [
      'orderId',
      fn.sum('count').as('totalCount'),
      sql<number>`SUM(${ref('count')} * ${ref('price')})`.as('totalPrice'),
    ])
    .where('orderId', '=', orderId)
    .execute()

  return (
    <main className="items-center p-24">
      <div>
        {details.map((detail) => (
          <>
            <h1>Order ID: {detail.orderId}</h1>
            <h2>Price: {detail.totalPrice} €</h2>
            <h3>Count: {String(detail.totalCount)}</h3>
          </>
        ))}
      </div>
    </main>
  )
}
