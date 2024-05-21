import api from "@/api"
import jwt  from "jwt-decode";
import { EditDialog } from "@/components/EditDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { DecodedUser, Product , ROLE, User} from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom";

export function Dashboard() {
  const navegate = useNavigate();
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    price: 0,
    img: ""
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
      const res = await api.post("/products", product,)
    
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getUsers = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.get("/users",{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const deleteProduct = async (productId: string) => {
    try {
      const res = await api.delete(`/products/${productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto mt-20 w-1/2">
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
          <Input
            name="img"
            className="mt-4"
            type="string"
            placeholder="img"
            onChange={handleChange}
          />
          <Button className="mt-4" type="submit">
            Add
          </Button>
        </div>
      </form>
      <div>
        <h1 className="scroll-m-20 text-4x1 my-3 font-semibold tracking-tight">products</h1>
        <Table>
          <TableCaption>A list of your recent Products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>categoryId</TableHead>
              <TableHead>price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell></TableCell>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                <TableCell>
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
