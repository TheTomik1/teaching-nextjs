import { useContext, useEffect, useState } from 'react'
import { ShoppingCardContext } from './ShoppingCardComponent'

import { FaCirclePlus, FaCircleMinus, FaTrashCan } from 'react-icons/fa6'

type CartItemProps = {
  id: number
  count: number
  name: string
  price: number
  imageUrl: string
}

const CartItem = (props: CartItemProps) => {
  const { addItem } = useContext(ShoppingCardContext)
  const { removeItem } = useContext(ShoppingCardContext)
  const { deleteItem } = useContext(ShoppingCardContext)

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <img src={props.imageUrl} alt={props.name} className="w-36 h-36 object-cover rounded" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{props.name}</h2>
          <p className="text-sm text-gray-500">Price: ${props.price}</p>
          <p className="text-sm text-gray-500">Quantity: {props.count}</p>
        </div>
      </div>
      <div className="flex items-center">
        <FaCirclePlus
          onClick={() => addItem({ id: props.id, name: props.name, price: props.price })}
          className="text-blue-500 text-4xl hover:text-blue-600 cursor-pointer"
        />
        <FaCircleMinus
          onClick={() => removeItem(props.id)}
          className="ml-4 text-amber-500 text-4xl hover:text-amber-600 cursor-pointer"
        />
        <FaTrashCan
          onClick={() => deleteItem(props.id)}
          className="ml-4 text-red-500 text-4xl hover:text-red-600 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default CartItem
