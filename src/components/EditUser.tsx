import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function EditUser({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const [updatedUser, setUpdatedUser] = useState(user)

  const updateUser = async () => {
    try {
      const res = await api.patch(`/users/${updatedUser.id}`, updatedUser)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleUpdateUser = async () => {
    await updateUser()
    setOpen(false)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value,name } = e.target
    setUpdatedUser({
      ...updatedUser,
    [name]: value
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
            id="name"
              defaultValue={updatedUser.name}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Email
            </Label>
            <Input
            name="email"
              id="email"
              defaultValue={updatedUser.email}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label className="text-right">
              img
            </Label>
            <Input
              name="phone"
              id="phone"
              defaultValue={updatedUser.phone}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateUser}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
