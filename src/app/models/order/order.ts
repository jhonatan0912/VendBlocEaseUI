import { Product } from "../product/product"

export interface Order {
    customerEmail:string
    products:Product[]
    outletId:number
    amount:number
    id:number
}
