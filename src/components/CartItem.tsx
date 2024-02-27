import { useContext, useEffect, useState } from 'react'
import { productDetails } from '../app/actions/product-details'
import { ShoppingCardContext } from './ShoppingCardComponent'

type CartItemProps = {
  id: number
  count: number
  name: string
  price: number
  imageUrl: string
}

const CartItem = (props: CartItemProps) => {
  const { removeItem } = useContext(ShoppingCardContext)

  return (
    <div className="bg-zinc-600 p-4 mt-12 w-full rounded-xl shadow-xl hover:cursor-pointer hover:scale-105 transition-transform">
      <div className="bg-zinc-800 p-4 rounded-xl text-white">
        <h1 className="text-2xl font-bold">{props.name}</h1>
        <p className="text-lg font-bold">Price: {props.price} €</p>
        <p className="text-lg font-bold">Quantity: {props.count}</p>

        <div className="w-full h-0.5 bg-zinc-400 my-4"></div>
        <p className="text-lg font-bold">Total: {props.price * props.count} €</p>
        {props.imageUrl && <img src={props.imageUrl} alt={props.name} className="mx-auto rounded-lg" />}
      </div>
      <button onClick={() => removeItem(props.id)} className="btn btn-error p-4 mt-4 text-white font-bold">
        Remove
      </button>
    </div>
  )
}

export default CartItem
