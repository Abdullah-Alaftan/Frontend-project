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
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useContext, useState } from "react"
import { Navbar } from "@/components/NavBar"
import React from "react"

import { HeroSection } from "@/components/HeroSection"
import { Link } from "react-router-dom"
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

  return (
    <>
      <Navbar handleChange={handleChange} />
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <section className="flex flex-wrap flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        <HeroSection />
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <img src={product.img} className="mb-3 h-30 css.6bmoar css.a3xaio" />{" "}
              {/* Add the classes here */}
              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>{product.price}</CardContent>
            <CardFooter>
              <Button variant={"outline"}>
                <Link to={`/products/${product.id}`}>Details</Link>
              </Button>
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
