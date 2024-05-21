import { createContext, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import "./App.css"
import { Product } from "./types"
import { Home } from "./pages/Home"
import { ProductDetails } from "./pages/ProductDetails"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { PrivateRoute } from "./components/ui/PrivateRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/dashboard",
    element: 
      <PrivateRoute>
      <Dashboard />
      </PrivateRoute>
  },
  {
    path: "/products/:productId",
    element: <ProductDetails/>
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/Signup",
    element: <Signup/>
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
