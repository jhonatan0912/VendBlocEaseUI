import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../../../models/order/order';
import { ResponseDTO } from '../../../models/response/response';


const httpOptions:any = {
  Headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  baseUrl :string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getProductsCategories(outletId:number):Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/ProductCategory/GetByOutlet/'+outletId);
  }

  getInventoryByOutlet(outletId:number):Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Inventory/get-by-outlet/'+outletId);
  }

  checkout(order:Order):Observable<any>{
    return this.http.post(this.baseUrl+'api/Order/Checkout', order, httpOptions)
  }

  getUserOrders(email:string):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Order/GetOrdersByUser/'+email);
  }

  getOrder(id:number):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Order/'+id);
  }

  verifyPayment(reference:string):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Payments/VerifyOrder?reference='+reference);
  }

}
