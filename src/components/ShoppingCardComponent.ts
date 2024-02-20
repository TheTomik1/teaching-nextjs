import { createContext } from 'react'

type ShoppingCard = {
  items: { id: number; count: number }[]
  addItem: (item: object) => void
  removeItem: (id: number) => void
}

export const ShoppingCardContext = createContext<ShoppingCard>({
  items: [],
  addItem: (items) => {},
  removeItem: (id) => {},
})
