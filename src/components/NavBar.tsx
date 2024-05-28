import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChangeEvent, useContext } from "react";
import { GlobalContext } from "@/App";
import { ROLE } from "@/types";
import { Cart } from "./Cart";

type NavbarProps = {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Navbar({ handleChange }: NavbarProps) {
  const context = useContext(GlobalContext);

  if (!context) throw Error("Context is missing");
  const { state , handleRemoveUser } = context;

  const handleLogout = () =>{
    if(typeof window !== undefined){
      window.location.reload()
    }
    localStorage.removeItem(`token`)
    localStorage.removeItem(`user`)
    handleRemoveUser()
  }
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 fixed z-30 bg-[rgba(0,0,0,0.5)]">
      <Link className="flex items-center mr-0 md:mr-20 text-white" to="/">
        <img src="/LOGO.png" alt="Logo" className="h-16 w-16 md:h-20 md:w-20" />
      </Link>
      <NavigationMenu className="flex items-center gap-6 text-sm font-medium">
        <NavigationMenuList className="flex items-center gap-6 md:gap-10 text-white">
          <NavigationMenuLink asChild>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
          {state.user?.role === ROLE.Admin && (
            <NavigationMenuLink asChild>
              <Link to="/dashboard">dashboard</Link>
            </NavigationMenuLink>
          )}
          {/*         
          <NavigationMenuLink asChild>
            <Button to="Footer">About</Button>
          </NavigationMenuLink> */}
          {!state.user && (
            <>
              <NavigationMenuLink asChild>
                <Link to="/Login">Login</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/Signup">Signup</Link>
              </NavigationMenuLink>
            </>
          )}
          {state.user && (
            <>
              <NavigationMenuLink asChild>
                <Button variant={"ghost"} onClick={handleLogout}>Logout</Button>
              </NavigationMenuLink>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-6 md:gap-10 text-white">
        <form className="w-full">
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
  );
}

