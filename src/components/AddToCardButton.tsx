'use client'

import { useContext } from 'react'
import { ShoppingCardContext } from './ShoppingCardComponent'

type Props = {
  id: number
}

export function AddToCardButton({ id }: Props) {
  const { addItem } = useContext(ShoppingCardContext)

  return (
    <button
      className="btn btn-outline btn-xs"
      onClick={() => {
        addItem({ id })
      }}
    >
      Add to cart
    </button>
  )
}
