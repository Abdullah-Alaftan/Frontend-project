import { ROLE } from "@/types"
import {ReactElement } from "react"
import jwt  from "jwt-decode";
import { Navigate } from "react-router-dom";
import { reshapeUser } from "@/lib/utils";

export function PrivateRoute({ children }: { children: ReactElement }) {

    const token = localStorage.getItem("token") || ""
    if(!token) return <Navigate to="/" />
    const decodedToken = jwt(token) 
    
    const decodedUser = reshapeUser(decodedToken)

return decodedUser.role === ROLE.Customer ?<Navigate to="/" />:children
}
