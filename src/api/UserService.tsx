import api from "@/api"
import { User } from "../types"

export default {
  getAll: async () => {
    try {
      const res = await api.get("/users")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  createOne: async (user: User) => {
    try {
      const res = await api.post("/users", user)

      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (id: string)=>{
    try {
      const res = await api.delete(`/user/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  }
