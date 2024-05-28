import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Signup() {
  const navegate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: null
  })

  console.log("user:", user)

  const handleSignup = async () => {
    try {
      const res = await api.post(`/users/signup`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await handleSignup()
    console.log("response:", response)
    if (response) {
      navegate("/login")
    }
  }
  return (
    <div>
      <h1>Signup</h1>
      <form action="POST" onSubmit={handleSubmit} className="w-full md:w-1/3 mx-auto">
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="name"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          className="mt-4"
          placeholder="password"
          onChange={handleChange}
        />
        <Input
          name="email"
          type="text"
          className="mt-4"
          placeholder="email"
          onChange={handleChange}
        />
        <Input
          name="phone"
          type="text"
          className="mt-4"
          placeholder="phone number"
          onChange={handleChange}
        />
        <div className="flex justify-between flex-col">
          <Button className="mt-4">Create An Account</Button>
          <Button className="mt-4" variant="link">
            <Link to="/Login">Already have an Account?</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
