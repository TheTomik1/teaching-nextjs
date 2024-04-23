import { createDB } from '../../lib/db'

export default async function CreateProductPage() {
  const db = createDB()

  const orders = await db.selectFrom('orders').selectAll().execute()

  return (
    <main className="items-center p-24">
      <div>
        <h1 className="text-3xl text-black mb-12">Product Order History</h1>
        {orders.map((order) => (
          <>
            <p>Order ID: {order.id}</p>
            <p>Total items: {order.totalCount}</p>
            <p>Total price: {order.totalPrice} €</p>
            <div className="flex justify-end p-2 border-t border-gray-400" />
          </>
        ))}
      </div>
    </main>
  )
}
