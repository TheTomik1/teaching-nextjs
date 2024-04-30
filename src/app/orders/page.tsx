import { createDB } from '../../lib/db'

export default async function CreateProductPage() {
  const db = createDB()

  const orders = await db
    .selectFrom('orders')
    .leftJoin('ordersProducts', 'ordersProducts.orderId', 'orders.id')
    .groupBy(['orderId'])
    .select(({ fn }) => ['orderId', fn.sum('count').as('total_count'), fn.sum('price').as('total_price')])
    .execute()

  return (
    <main className="items-center p-24">
      <div>
        <h1 className="text-3xl text-black mb-12">Product Order History</h1>
        {orders.map((order) => (
          <>
            <p>Order ID: {order.orderId}</p>
            <p>Total items: {order.totalCount}</p>
            <p>Total price: {`${order.totalPrice}`} €</p>
            <div className="flex justify-end p-2 border-t border-gray-400" />
          </>
        ))}
      </div>
    </main>
  )
}
