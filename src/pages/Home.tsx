import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { CardContainer, CardBody } from "@/components/ui/ThreeDCard"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useContext, useState } from "react"
import { Navbar } from "@/components/NavBar"

import { Link } from "react-router-dom"
import { HeroBar } from "@/components/ui/HeroBar"
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/Footer"
import { LoadingPage } from "./LoadingPage"
export function Home() {
  const context = useContext(GlobalContext)

  if (!context) throw Error("Context is missing")
  const { state, handleAddToCart } = context

  const [searchBy, setSearchBy] = useState("")

  const queryClient = useQueryClient()

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?search=${searchBy}`)
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }, 1000)
  }
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  }
  const {
    data: loading,
    error: loadingerror,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProducts
  })

  if (isLoading) {
    return <p><LoadingPage/></p>
  }
  if (!loading) {
    return <p>Product not found</p>
  }


  return (
    <>
      <Navbar handleChange={handleChange} />
      <HeroBar />
      <div className="pt-40 color-#4D869C">
        <div>
      <h1 className="text-5xl uppercase font-bold text-white">Products</h1>
      </div>
        <section
          id="products"
          className="flex flex-wrap flex-col md:flex-row gap-4 justify-around max-w-6xl mx-auto color-#4D869C"
        >
          {data?.map((product) => (
            <CardContainer key={product.id} className="w-[350px] flex flex-col bg-white">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <img
                  src={product.img}
                  className="mb-3 h-56 w-56 object-contain css.6bmoar css.a3xaio"
                />{" "}
                <CardBody>Some Description here</CardBody>
              </CardHeader>
              <CardBody>{product.price}</CardBody>
              <CardFooter>
                <Button variant={"outline"}>
                
                  {/* <Link to={""}>Details</Link> */}
                  <Link onClick={scrollToTop} to={`/products/${product.id}`}>Details</Link>
                </Button>
                <Button className="w-full mx-1" onClick={() => handleAddToCart(product)}>
                  Add to cart
                </Button>
              </CardFooter>
            </CardContainer>
          ))}
        </section>
      </div>
<Footer/>

      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
