import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Login() {
    const navegate = useNavigate();

    const[user,setUser]= useState({
        email: "",
        password: "",
    })
    console.log('user:', user)
    const handleLogin = async () => {
        try {
          const res = await api.post(`/users/login`, user)
          return res.data
        } catch (error) {
          console.error(error)
          return Promise.reject(new Error("Something went wrong"))
        }
      }
    
      const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    
    const  {name, value} = e.target
    setUser({
      ...user, [name]: value})
  }
  const handleSubmit = async (e: FormEvent) =>{
    e.preventDefault()
    const token =await handleLogin()
    if (token) {
        localStorage.setItem("token", token)

    navegate("/")
    }
  }
  return (
    <div>
      <h1>login</h1>
      <form action="POST" className="w-full md:w-1/3 mx-auto" onSubmit={handleSubmit}>
        <Input
          name="Email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="Password"
          type="password"
          className="mt-4"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="flex justify-between flex-col">
          <Button className="mt-4">
            Login
          </Button>
          <Button className="mt-4" variant= "link">
            <Link to="/Signup">
            Create An Account
            </Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
