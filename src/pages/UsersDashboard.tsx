import api from "@/api"
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
import { User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import { Navbar } from "@/components/NavBar"
import { AdminMenu } from "@/components/AdminMenu"
import UserService from "@/api/UserService"
import { EditUser } from "@/components/EditUser"

export function UsersDashboard() {
  const queryClient = useQueryClient()

  const [user, setUser] = useState({
    id: "",
    role: "",
    name: "",
    email: "",
    phone: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e: any) => {
    console.log(user)

    e.preventDefault()
    await UserService.createOne(user)
    queryClient.invalidateQueries({ queryKey: ["users"] })
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

  //   const getCategories = async () => {
  //     try {
  //       const res = await api.get("/categorys", {})
  //       return res.data
  //     } catch (error) {
  //       console.error(error)
  //       return Promise.reject(new Error("Something went wrong"))
  //     }
  //   }
  const handleDeleteUser = async (id: string) => {
    await UserService.deleteOne(id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }
  // Queries
  //   const { data: products, error } = useQuery<Product[]>({
  //     queryKey: ["products"],
  //     queryFn: ProductService.getAll
  //   })

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  //   const { data: categories, error: catError } = useQuery<Category[]>({
  //     queryKey: ["categories"],
  //     queryFn: getCategories
  //   })

  //   const productWithCat: ProductWithCat[] | undefined = products?.map((product) => {
  //     const category = categories?.find((cat) => cat.id === product.categoryId)
  //     if (category) {
  //       return {
  //         ...product,
  //         categoryName: category.type
  //       }
  //     }
  //     return { ...product, categoryName: "" }
  //   })
  //   const handleSelect = (e) => {
  //     console.log("=====", e.target.value)
  //     setProduct({
  //       ...product,
  //       categoryId: e.target.value
  //     })
  //   }
  return (
    <>
      <Navbar />
      <AdminMenu />
      {/* <form onSubmit={handleSubmit}>
        <div className="mx-auto mt-20 w-1/2">
          <h1>add a new user</h1>
          <Input
            name="name"
            className="mt-4"
            type="string"
            placeholder="Name"
            onChange={handleChange}
          />
           <Input
            name="categoryId"
            className="mt-4"
            type="text"
            placeholder="Category"
            onChange={handleChange}
          /> *
           <select name="cats" className="mt-4" onChange={handleSelect}>
            <option selected>select option</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.type}
              </option>
            ))}
          </select> 

          <Input
            name="email"
            className="mt-4"
            type="string"
            placeholder="email"
            onChange={handleChange}
          />
          <Input
            name="phone"
            className="mt-4"
            type="string"
            placeholder="phone number"
            onChange={handleChange}
          />
          <Button className="mt-4" type="submit">
            Add
          </Button>
        </div>
      </form> */}
      <div>
        <h1 className="scroll-m-20 text-4x1 my-3 font-semibold tracking-tight">Users</h1>
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={users}>
                <TableCell></TableCell>

                <TableCell className="text-left">{user.name}</TableCell>
                <TableCell className="text-left">{user.email}</TableCell>
                <TableCell className="text-left">{user.phone}</TableCell>
                <TableCell className="text-left">{user.role}</TableCell>
                <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                <TableCell>
                  <EditUser user={users} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
