'use client'

import { useContext } from 'react'
import { ShoppingCardContext } from '../../components/ShoppingCardComponent'

type ItemProps = {
  id: number
  count: number
}

export default function Card() {
  const { items, removeItem } = useContext(ShoppingCardContext)

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div>
        {items.map((item: ItemProps) => (
          <div key={item.id} className="flex justify-between w-96 mb-12">
            <div>
              <h2>Product ID: {item.id}</h2>
              <p>Quanitity: {item.count}</p>
              <button
                className="btn btn-outline btn-xs"
                onClick={() => {
                  removeItem(item.id)
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
