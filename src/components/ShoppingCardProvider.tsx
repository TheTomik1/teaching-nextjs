'use client'

import { useState } from 'react'
import { ShoppingCardContext } from './ShoppingCardComponent'

type Props = {
  children: any
}

export function ShoppingCardProvider({ children }: Props) {
  const [items, setItems] = useState<{ id: number; name: string; price: number; count: number }[]>([])

  const addItem = (item: { id: number; name: string; price: number }) => {
    const exists = items.some((i) => i.id === item.id)

    if (!exists) {
      setItems([...items, { ...item, count: 1 }])
      return
    } else {
      setItems(
        items.map((i) => {
          if (i.id === item.id) {
            return { ...i, count: i.count + 1 }
          }
          return i
        })
      )
    }
  }

  const removeItem = (id: number) => {
    const reduceByOne = items.map((i) => {
      if (i.id === id) {
        return { ...i, count: i.count - 1 }
      }
      return i
    })

    const filtered = reduceByOne.filter((i) => i.count > 0)
    setItems(filtered)
  }

  return <ShoppingCardContext.Provider value={{ items, addItem, removeItem }}>{children}</ShoppingCardContext.Provider>
}
