import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <header className="flex h-16 w-full items-left justify-between px- md:px-6">
      <Link className="flex items-center mr-20" to="#">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">shoefiy</span>
      </Link>
      <NavigationMenu className="hidden items-center gap-6 text-sm font-medium md:flex md:gap-10 top-0">
        <NavigationMenuList className="md:gap-10">
          <NavigationMenuLink asChild>
            <Link to="http://localhost:3000/">Home</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="#http://localhost:3000/dashboard">About</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="#">Services</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="#">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="relative flex items-center gap-4 flex-1 max-w-md md:ml-auto">
        <form>
          <Input
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Search..."
            type="text"
          />
          <Button className="sr-only" type="submit">
            Search
          </Button>
        </form>
        <Link className="relative" to="#">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-2 py-1">
            3
          </span>
        </Link>
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

function ShoppingCartIcon(props: any) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
