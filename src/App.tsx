import { createContext, useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import "./App.css"
import { DecodedUser, Product } from "./types"
import { Home } from "./pages/Home"
import { ProductDetails } from "./pages/ProductDetails"
import { ProductDetailPage } from "./pages/productdeatilspage"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { PrivateRoute } from "./components/ui/PrivateRoute"
import { UsersDashboard } from "./pages/UsersDashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
 
  {
    path: "/products/:productId",
    element: <ProductDetailPage />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/UsersDashboard",
    element:(
      <PrivateRoute>
      <UsersDashboard />  
      </PrivateRoute>
    )
  },
 
  {
    path: "/Signup",
    element: <Signup />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (productId: string) => void
  // handleRemoveCart: () => void
  handleDecreaseFromCart: (productId: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveUser: () => void

}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)
function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])
  const handleAddToCart = (product: Product) => {
    // const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)

    // if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
   
    const filteredCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filteredCart
    })
  }
  // const handleRemoveCart = () => {
   
  //   setState({
  //     ...state,
  //     cart: []
  //   })
  // }
  const handleDecreaseFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.id === id)
    console.log('cart:', cart)
    cart.splice (index, 1)
   
     
    // const filteredCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: cart
    })
  }
  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }
  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider
        value={{ state, handleAddToCart, handleDeleteFromCart, handleStoreUser , handleDecreaseFromCart , handleRemoveUser }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
