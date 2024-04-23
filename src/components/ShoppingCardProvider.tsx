'use client'

import { useState, useEffect } from 'react'
import { ShoppingCardContext } from './ShoppingCardComponent'

type Props = {
  children: any
}

export function ShoppingCardProvider({ children }: Props) {
  const [items, setItems] = useState<{ id: number; name: string; price: number; count: number }[]>(() => {
    const items = localStorage.getItem('items')
    return items ? JSON.parse(items) : []
  })

  const addItem = (item: { id: number; name: string; price: number }) => {
    const exists = items.some((i) => i.id === item.id)

    if (!exists) {
      setItems([...items, { ...item, count: 1 }])
      localStorage.setItem('items', JSON.stringify([...items, { ...item, count: 1 }]))
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

      localStorage.setItem(
        'items',
        JSON.stringify(items.map((i) => (i.id === item.id ? { ...i, count: i.count + 1 } : i)))
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

    localStorage.setItem('items', JSON.stringify(reduceByOne))

    const filtered = reduceByOne.filter((i) => i.count > 0)
    setItems(filtered)
  }

  const deleteItem = (id: number) => {
    const filtered = items.filter((i) => i.id !== id)

    localStorage.setItem('items', JSON.stringify(filtered))

    setItems(filtered)
  }

  const clearItems = () => {
    localStorage.setItem('items', JSON.stringify([]))

    setItems([])
  }

  return (
    <ShoppingCardContext.Provider value={{ items, addItem, removeItem, deleteItem, clearItems }}>
      {children}
    </ShoppingCardContext.Provider>
  )
}
