export interface Inventory {
    id:number
    productId:number
    salesPrice:number
    quantity:number
    product:string
    productCategoryId:number
    orderQuantity:number
    price:number
    unit:string
}

export interface CreateInventory{
    productId: number
    costPrice: number
    salesPrice: number
    quantity: number
    outletId: number
    manufacturingDate: string
    expiringDate: string
    remark: string
}