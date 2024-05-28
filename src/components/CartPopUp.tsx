import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Link } from "react-router-dom"

export function cartPopUp() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
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
        <Popover>
          <PopoverTrigger asChild>
            <Link className="relative" to="#">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-2 py-1">
                3
              </span>
            </Link>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cart</h3>
              <Button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                size="icon"
                variant="ghost"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Product Image"
                    className="rounded-md"
                    height={64}
                    src="/placeholder.svg"
                  
                  />
                  <div>
                    <h4 className="font-medium">Product Name</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">$19.99</p>
                  </div>
                </div>
                <Button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  size="icon"
                  variant="ghost"
                >
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 object-contain">
                  <img
                    alt="Product Image"
                    className="rounded-md"
                    height={64}
                    src="/placeholder.svg"
                  />
                  <div>
                    <h4 className="font-medium">Another Product</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">$29.99</p>
                  </div>
                </div>
                <Button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  size="icon"
                  variant="ghost"
                >
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline">View Cart</Button>
              <Button className="ml-2">Checkout</Button>
            </div>
          </PopoverContent>
        </Popover>
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

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
