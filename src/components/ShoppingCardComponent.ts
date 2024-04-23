import { createContext } from 'react'

type ShoppingCard = {
  items: { id: number; count: number }[]
  addItem: (items: { id: number; name: string; price: number }) => void
  removeItem: (id: number) => void
  deleteItem: (id: number) => void
  clearItems: () => void
}

export const ShoppingCardContext = createContext<ShoppingCard>({
  items: [],
  addItem: (items) => {},
  removeItem: (id) => {},
  deleteItem: (id) => {},
  clearItems: () => {},
})
