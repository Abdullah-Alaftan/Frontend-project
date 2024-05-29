import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { GlobalContext } from "@/App"
import api from "@/api"
import Footer from "@/components/Footer"
import { Navbar } from "@/components/NavBar"

import { Product } from "@/types"

import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { LoadingPage } from "./LoadingPage"

export function ProductDetailPage() {
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

  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })

  if (isLoading) {
    return <p><LoadingPage/></p>
  }
  if (!product) {
    return <p>Product not found</p>
  }

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        key="1"
        className="flex-grow grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-48 w-full h-full"
      >
        <div className="grid md:grid-cols-5 gap-3 items-start w-full h-full">
          <div className="flex md:hidden items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl sm:text-3xl">{product.name}</h1>
              <div>
                <p>{product.Descreption}</p>
              </div>
            </div>
            <div className="text-4xl font-bold ml-auto">{product.price}</div>
          </div>
          <div className="md:col-span-4">
            <img
              alt="Product Image"
              className="bg-white aspect-[3/3] object-contain border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              src={product.img}
            />
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 pt-8 items-start w-full">
          <div className="hidden md:flex items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
              <div>
                <p>{product.Descreption}</p>
              </div>
            </div>
            <div className="text-4xl font-bold ml-auto">{product.price}</div>
          </div>
          <div className="grid gap-4 md:gap-10">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="color">
                Color
              </Label>
              <RadioGroup className="flex items-center gap-2" defaultValue="black" id="color">
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-black"
                >
                  <RadioGroupItem id="color-black" value="black" />
                  Black
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-white"
                >
                  <RadioGroupItem id="color-white" value="white" />
                  White
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-blue"
                >
                  <RadioGroupItem id="color-blue" value="blue" />
                  Blue
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="size">
                Size
              </Label>
              <RadioGroup className="flex items-center gap-2" defaultValue="m" id="size">
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="size-40"
                >
                  <RadioGroupItem id="size-40" value="40" />
                  40
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="size-41"
                >
                  <RadioGroupItem id="size-41" value="41" />
                  41
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="size-42"
                >
                  <RadioGroupItem id="size-42" value="42" />
                  42
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="size-43"
                >
                  <RadioGroupItem id="size-43" value="43" />
                  43
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="size-44"
                >
                  <RadioGroupItem id="size-44" value="44" />
                  44
                </Label>
              </RadioGroup>
            </div>
            <Button className="w-full mx-1" onClick={() => handleAddToCart(product)}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
