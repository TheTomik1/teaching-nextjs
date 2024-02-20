'use client'

import { useContext } from 'react'
import { ShoppingCardContext } from './ShoppingCardComponent'

export function ShoppingCartIndicator() {
  const { items } = useContext(ShoppingCardContext)

  let itemsCount = 0
  for (const item of Object.values(items)) {
    itemsCount += item.count
  }

  return <div>Items: {itemsCount}</div>
}
