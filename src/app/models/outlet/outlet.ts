export interface Outlet {
    id: number
    name : string
    storeId: number
    store : string
    currencyId: number
    currency : string
    deliveryFee?:number
    address?:string
    phone?:string
}


export interface CreateOutlet {
    name : string
    storeId: number
    currencyId: number
}