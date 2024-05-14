import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

export function Dashboard(){
    const queryClient = useQueryClient()

    const [product, setProduct] = useState({
      name: "",
      categoryId: "",
      price: 0,
      img: "https://preview.thenewsmarket.com/Previews/ADID/StillAssets/Source_Max_2560/558273.jpg"
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setProduct({
        ...product,
        [name]: value
      })
    }
    const postProduct = async () => {
      try {
        const res = await api.post("/products", product)
        return res.data
      } catch (error) {
        console.error(error)
        return Promise.reject(new Error("Something went wrong"))
      }
    }
    const handleSubmit = async (e: any) => {
      console.log("handleSubmit:", handleSubmit)
      e.preventDefault()
      await postProduct()
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
    console.log("product ", product)
   return(
   <form onSubmit={handleSubmit}>
    <div className="mt-20 w-1/2">
        <h1>add a new product</h1>
      <Input
        name="name"
        className="mt-4"
        type="text"
        placeholder="Name"
        onChange={handleChange}
      />
      <Input
        name="categoryId"
        className="mt-4"
        type="text"
        placeholder="Category"
        onChange={handleChange}
      />
      <Input
        name="price"
        className="mt-4"
        type="numper"
        placeholder="price"
        onChange={handleChange}
      />
      <Input name="img" className="mt-4" type="text" placeholder="img" />
      <Button className="mt-4" type="submit">
        Add
      </Button>
    </div>
  </form>
)}