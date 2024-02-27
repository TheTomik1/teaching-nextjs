'use client'

import { useContext, useEffect, useState } from 'react'
import { ShoppingCardContext } from '../../components/ShoppingCardComponent'
import CartItem from '../../components/CartItem'
import { productDetails } from '../actions/product-details'

type ItemProps = {
  id: number
  count: number
  name: string
  price: number
  imageUrl: string
}

export default function Card() {
  const { items } = useContext(ShoppingCardContext)

  const [cartState, setCartState] = useState<ItemProps[]>([])
  const [loading, setLoading] = useState(true)

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

  if (cartState.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center p-24">
        <div>
          <h1 className="text-2xl font-bold">Your cart is empty.</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div>
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
    </div>
  )
}
