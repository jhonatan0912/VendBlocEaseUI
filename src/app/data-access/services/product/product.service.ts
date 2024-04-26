import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateProduct } from '../../../models/product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private baseUrl : string = environment.baseUrl;

  public createProduct(model:CreateProduct):Observable<any>{
    return this.http.post(this.baseUrl+'api/product', model)
  }

  public deleteProduct(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+'api/product/'+id)
  }

}
