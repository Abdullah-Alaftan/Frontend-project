import { GlobalContext } from "@/App"
import { useContext } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { Key, MinusIcon, PlusIcon, XIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Product } from "@/types"
import api from "@/api"

type OrderCheckout = {
  productId: string
  quantity: number
  color: string
  size: string
}
type ProductGroup = {
  [key: string]: Product[]
}
export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleDeleteFromCart, handleAddToCart, handleDecreaseFromCart } = context
  const groups: ProductGroup = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as ProductGroup)
  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  const CheckoutOrder: OrderCheckout[] = []
  Object.keys(groups).forEach((key) => {
    const products = groups[key]
    CheckoutOrder.push({
      productId: key,
      quantity: products.length,
      color: "red",
      size: "44"
    })
  })
  const handleCheckout = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.post("/orders", CheckoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // if(res.status === 201){
      //   handleRemoveCart()
      // }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {
          <Link className="relative" to="#">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-2 py-1">
              {Object.keys(groups).length}
            </span>
          </Link>
        }
      </PopoverTrigger>
      {/* start of cart  */}
      <PopoverContent className="w-80 p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Cart</h3>
          <Button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            size="icon"
            variant="ghost"
          >
            <XIcon className="w-5 h-5" />
          </Button>
        </div>
        <div className="space-y-4">
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]
            const total = products.reduce((acc, curr) => {
              return acc + curr.price
            }, 0)
            return (
              <div key={product.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Product Image"
                      className="rounded-md"
                      height={64}
                      src={product.img}
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "contain"
                      }}
                      width={64}
                    />
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <button
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            onClick={() => handleDecreaseFromCart(product.id)}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span>{products.length}</span>
                          <button
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            onClick={() => handleAddToCart(product)}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteFromCart(product.id)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    size="icon"
                    variant="ghost"
                  >
                    <XIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex justify-end">
          <p className="ml-2">Total: {total}</p>
          {/* <Button variant="outline">View Cart</Button> */}
          <Button className="ml-2" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
