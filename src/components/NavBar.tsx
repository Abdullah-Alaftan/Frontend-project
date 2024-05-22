import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChangeEvent, useContext, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { GlobalContext } from "@/App"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { XIcon } from "lucide-react"
import { ROLE } from "@/types"
import { Cart } from "./Cart"

type NavbarProps = {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export function Navbar({ handleChange }: NavbarProps) {
  const context = useContext(GlobalContext)

  if (!context) throw Error("Context is missing")
  const { state } = context

  // const { state } = context
  // console.log("state:", state)
  // const queryClient = useQueryClient()

  // const [searchBy, setSearchBy] = useState("")
  // console.log('searchBy:', searchBy)

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target
  //   setSearchBy(value)
  //   queryClient.invalidateQueries({ queryKey: ["products"] })

  // }

  return (
    <header className="flex h-16 w-full items-left justify-between px-4 md:px-6  inset-y-0	fixed z-30 bg-blue-500">
      <Link className="flex items-center mr-20" to="#">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">shoefiy</span>
      </Link>
      <NavigationMenu className="hidden items-center gap-6 text-sm font-medium md:flex md:gap-10 top-0">
        <NavigationMenuList className="md:gap-10">
          <NavigationMenuLink asChild>
            <Link to="http://localhost:3000/">Home</Link>
          </NavigationMenuLink>
          {state.user?.role === ROLE.Admin && (
            <NavigationMenuLink asChild>
              <Link to="/dashboard">dashboard</Link>
            </NavigationMenuLink>
          )}
          <NavigationMenuLink asChild>
            <Link to="#">Services</Link>
          </NavigationMenuLink>
          {!state.user && (
            <NavigationMenuLink asChild>
              <Link to="/Login">Login</Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="relative flex items-center gap-4 flex-1 max-w-md md:ml-auto">
        <form>
          <Input
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Search..."
            type="text"
            onChange={handleChange}
          />
          <Button className="sr-only" type="submit">
            Search
          </Button>
        </form>
        <Cart />
      </div>
    </header>
  )
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
