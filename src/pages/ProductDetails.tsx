import { GlobalContext } from "@/App"
import api from "@/api"
import { Navbar } from "@/components/NavBar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useContext } from "react"
import { useParams } from "react-router-dom"

type NavbarProps = {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export function ProductDetails({ handleChange }: NavbarProps) {
  const context = useContext(GlobalContext)

  const params = useParams()
  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  console.log("product:", product)

  if (isLoading) {
    return <p>loading....</p>
  }
  if (!product) {
    return <p>Product not found!!</p>
  }

  return (
    <>
      <Navbar handleChange={handleChange} />
      <div className="pt-20">
        <h3>{product.name}</h3>
      </div>
    </>
  )
}
