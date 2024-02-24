import { Product } from "../product/product"

export interface Order {
    customerEmail:string
    products:Product[]
    outletId:number
    amount:number
    deliveryCost:number
    orderCost:number
    id?:number,
    deliveryMode?:number,
    serviceCharge:number,
    orderDate?:Date
}
