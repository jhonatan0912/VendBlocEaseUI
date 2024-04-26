import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/response/response';
import { CreateInventory } from '../../../models/inventory/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http:HttpClient) { }
  private baseUrl : string = environment.baseUrl;

  getInventoryByOutlet(outletId:number):Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Inventory/get-by-outlet/'+outletId);
  }

  public createInventory(model:CreateInventory):Observable<any>{
    return this.http.post(this.baseUrl+'api/inventory', model)
  }
}
