import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateProduct } from '../../../models/product/product';
import { Observable } from 'rxjs';

const httpOptions:any = {
  Headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private baseUrl : string = environment.baseUrl;

  public createProduct(model:CreateProduct):Observable<any>{
    return this.http.post(this.baseUrl+'api/product', model, httpOptions)
  }

  public deleteProduct(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+'api/product/'+id, httpOptions)
  }

}
