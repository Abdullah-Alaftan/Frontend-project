import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Navbar } from "@/components/component/navbar"

export function Home() {
  const context = useContext(GlobalContext)

  if (!context) throw Error("Context is missing")
  const { state, handleAddToCart  } = context
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <>
      <Navbar />
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <h3>cart({state.cart.length})</h3>
      <section className="flex flex-wrap flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <img src={product.img} className="mb-3 h-30" />
              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>{product.price}</CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
