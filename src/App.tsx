import { createContext, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import "./App.css"
import { Product } from "./types"
import { Home } from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: < Home/>
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
}
type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)
function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)

    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }


  console.log("cart ", state.cart)
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddToCart }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
