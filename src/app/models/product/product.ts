export interface SaleProduct {
    id:number
    salesPrice:number
    quantity:number
    product:string
    productCategoryId:number
    orderQuantity:number
    price:number
}

export interface Product{
    id: number
    inventoryId: number
    name: string
    unit: string
    unitId: number
    storeId: number
    store: string
    productCategory: string
    productcategoryId: number
    quantity: number
    stockQuantity: number
    amount: number
}


export interface CreateProduct{
    name: string
    unitId: number
    storeId: number
    productCategoryId: number
    productType: number
}