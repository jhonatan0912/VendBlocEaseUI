import { Customer } from "../customer/customer"
import { Product } from "../product/product"

export interface CreateOrder {
    customerEmail:string
    orders:Product[][]
    outletId:number
    amount:number
    deliveryCost:number
    orderCost:number
    id?:number,
    deliveryMode?:number,
    serviceCharge:number,
    orderDate?:Date
}

export interface Order {
    id: number
    outletId: number
    storeId: number
    amount: number
    paymentType: string
    deliveryMode: string
    status: string
    orderDate:Date,
    outlet: string
    store: string
    products: OrderProduct[],
    customer:Customer
    deliveryCost:number
    paid:boolean
  }

  export interface OrderReport{
    orders:Order[],
    total:number
  }
  
  export interface OrderProduct {
    productId: number
    product: string
    amount: number
    outletId: number
    orderQuantity: number
    id: number //inventoryID
  }