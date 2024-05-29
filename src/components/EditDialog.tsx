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
import { Product } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function EditDialog({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const [updatedProduct, setUpdatedProduct] = useState(product)

  const updateProduct = async () => {
    try {
      const res = await api.patch(`/products/${updatedProduct.id}`, updatedProduct)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleUpdateProduct = async () => {
    await updateProduct()
    setOpen(false)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value,name } = e.target
    setUpdatedProduct({
      ...updatedProduct,
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
              defaultValue={updatedProduct.name}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Descreption" className="text-right">
            Descreption
            </Label>
            <Input
              name="Descreption"
            id="Descreption"
              defaultValue={updatedProduct.Descreption}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Price
            </Label>
            <Input
            name="price"
              id="price"
              defaultValue={updatedProduct.price}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label className="text-right">
              img
            </Label>
            <Input
              name="img"
              id="img"
              defaultValue={updatedProduct.img}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateProduct}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
