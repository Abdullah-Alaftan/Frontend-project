export type Product = {
  id: string
  name: string
  img: string
  price: number
  Descreption : string
  categoryId: string
}
export type ProductWithCat = Product & { categoryName: string }
export type User = {
  id: string
  role: string
  name: string
  email: string
  phone: number
}
export const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const

export type RoleType = (typeof ROLE)[keyof typeof ROLE]

export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: RoleType
}
export type Category = {
  id: string
  type: string
}
