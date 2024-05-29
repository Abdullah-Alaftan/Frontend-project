import api from "@/api"
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
import { Category, Product, ProductWithCat, User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import ProductService from "../api/products"
import { Navbar } from "@/components/NavBar"
import { AdminMenu } from "@/components/AdminMenu"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    price: 0,
    img: ""
    // Descreption : ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = async (e: any) => {
    console.log(product)

    e.preventDefault()
    await ProductService.createOne(product)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const getUsers = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getCategories = async () => {
    try {
      const res = await api.get("/categorys", {})
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleDeleteProduct = async (productId: string) => {
    await ProductService.deleteOne(productId)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  const productWithCat: ProductWithCat[] | undefined = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)
    if (category) {
      return {
        ...product,
        categoryName: category.type
      }
    }
    return { ...product, categoryName: "" }
  })
  const handleSelect = (e) => {
    console.log("=====", e.target.value)
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }
  return (
    <>
      <Navbar  />
      <div className="flex justify-center ">
        <AdminMenu />
        <div>
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
              {/* <Input
            name="categoryId"
            className="mt-4"
            type="text"
            placeholder="Category"
            onChange={handleChange}
          /> */}
              <select name="cats" className="mt-4" onChange={handleSelect}>
                <option selected>select option</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.type}
                  </option>
                ))}
              </select>

              <Input
                name="price"
                className="mt-4"
                type="number"
                placeholder="price"
                onChange={handleChange}
              />
               <Input
            name="Descreption"
            className="mt-4"
            type="string"
            placeholder="Descreption"
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
                  <TableHead>img</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>categoryId</TableHead>
                  <TableHead>price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productWithCat?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell></TableCell>
                    <TableCell className="text-left w-16">
                      <img src={product.img} />
                    </TableCell>
                    <TableCell className="text-left">{product.name}</TableCell>
                    <TableCell className="text-left">{product.categoryName}</TableCell>
                    <TableCell className="text-left">{product.price}</TableCell>
                    <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </Button>
                    <TableCell>
                      <EditDialog product={product} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
