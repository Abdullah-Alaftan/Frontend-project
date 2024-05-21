import { ROLE } from "@/types"
import {ReactElement } from "react"
import jwt  from "jwt-decode";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: ReactElement }) {

    const token = localStorage.getItem("token") || ""
    const decodedToken = jwt(token) 
    const decodedUser: any= {}
    if (decodedToken) {
      for (const [key, value] of Object.entries(decodedToken)) {
        let cleanKey = ""
        if(key.startsWith("http")){
       cleanKey = key.split("identity/claims/")[1]
      }else{
        cleanKey = key
      }
      decodedUser [cleanKey] = value
        } 
       }
return decodedUser.role === ROLE.Customer ?<Navigate to="/" />:children
}
