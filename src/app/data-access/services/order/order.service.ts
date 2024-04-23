import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateOrder, Order } from '../../../models/order/order';
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
    return this.http.get<ResponseDTO>(this.baseUrl+'api/ProductCategory/get-by-outlet/'+outletId);
  }

  checkout(order:CreateOrder):Observable<any>{
    return this.http.post(this.baseUrl+'api/Order/checkout', order, httpOptions)
  }

  getUserOrders(email:string):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Order/get-orders-by-user/'+email);
  }

  getOutletOrders(id:number):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Order/get-orders-by-outlet/'+id);
  }

  getOutletOrdersWithDate(id:number, date:string):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Order/get-orders-by-outlet/'+id+'?date='+date);
  }

  getOrder(id:number):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Order/'+id);
  }

  verifyPayment(reference:string):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Payments/VerifyOrder?reference='+reference);
  }

}
