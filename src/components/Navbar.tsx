import { ShoppingCartIndicator } from './ShoppingCardIndicator'

export function NavBar() {
  return (
    <div className="flex flex-row space-x-4">
      <h1>My EShop</h1>
      <ShoppingCartIndicator />
    </div>
  )
}
