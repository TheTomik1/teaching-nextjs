'use client'

import { useContext, useEffect, useState } from 'react'
import { ShoppingCardContext } from '../../components/ShoppingCardComponent'
import CartItem from '../../components/CartItem'
import { productDetails } from '../actions/product-details'
import { createOrder } from '../actions/create-order'

import { FaCartPlus } from 'react-icons/fa6'

type ItemProps = {
  id: number
  count: number
  name: string
  price: number
  imageUrl: string
}

export default function Card() {
  const { items, clearItems } = useContext(ShoppingCardContext)

  const [cartState, setCartState] = useState<ItemProps[]>([])
  const [loading, setLoading] = useState(true)

  const totalPrice = cartState.reduce((acc, item) => acc + item.price * item.count, 0)
  const totalCount = cartState.reduce((acc) => acc + 1, 0)

  const onSubmit = async () => {
    createOrder({
      totalPrice: totalPrice,
      totalCount: totalCount,
    })

    clearItems()
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const cartItems = items.map(async (item) => {
        const response = await productDetails(item.id)

        return {
          id: response.id,
          count: item.count,
          name: response.name,
          price: response.price,
          imageUrl: response.photos[0]?.url || '',
        }
      })

      try {
        const result = await Promise.all(cartItems)
        setCartState(result)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [items])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center p-24">
        <div>
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="items-center p-24">
      <div>
        {cartState.length === 0 && (
          <div className="flex justify-center p-4 border-gray-200">
            <p className="text-lg font-semibold">No items in the cart :(</p>
          </div>
        )}

        {cartState.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            count={item.count}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
      <div className="flex justify-end p-4 border-gray-200">
        <button
          onClick={onSubmit}
          className="p-4 bg-green-500 rounded-xl text-white font-bold hover:bg-green-600 transition-transform"
        >
          <FaCartPlus className="inline-block mr-2 text-3xl" />
          Checkout
        </button>
      </div>
      <div className="flex justify-end p-4 border-t border-gray-200">
        <p className="text-lg font-semibold">Total: {totalPrice} €</p>
      </div>
    </div>
  )
}
