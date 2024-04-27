import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseDTO } from '../../../models/response/response';
import { CreateOutlet, Outlet } from '../../../models/outlet/outlet';
import { LocalService } from '../local/local.service';



@Injectable({
  providedIn: 'root'
})
export class OutletService {
  private outletSubject = new BehaviorSubject<Outlet | null>(this.getInitialCurrentOutletState());
  private outlets$ = new BehaviorSubject<Outlet[]>([]);

  outlet$:Observable<Outlet | null> = this.outletSubject.asObservable();
  
  constructor(private http:HttpClient, private local:LocalService) { }
  private baseUrl : string = environment.baseUrl;

  public getOutlets():Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/outlets');
  }

  public getOutletsByUser(userId:string):Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/outlets/get-by-user/'+userId);
  }

  public getOutlet(id:number):Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/outlets/'+id);
  }

  public getOutletCustomers(id:number):Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/outlets/get-customers/'+id);
  }

  public createOutlet(model:CreateOutlet):Observable<any>{
    return this.http.post(this.baseUrl+'api/outlets', model)
  }

  public updateOutlet(model:Outlet):Observable<any>{
    return this.http.put(this.baseUrl+'api/outlets', model)
  }

  getOutletProducts(id:number):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Product/get-by-outlet/'+id);
  }

  getOutletUnits(storeId:number):Observable<any>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/Unit/get-by-store/'+storeId);
  }

  getOutletProductCategories(id:number):Observable<any>{
    console.log("Fetchign for ", id);
    return this.http.get<ResponseDTO>(this.baseUrl+'api/ProductCategory/get-by-outlet/'+id);
  }

  saveCurrentOutlet(outlet:Outlet){
      this.outletSubject.next(outlet);
      this.local.saveData('currentOutlet', JSON.stringify(outlet));
  }

  private getInitialCurrentOutletState(): Outlet | null {
    const storedCurrentOutletState = this.local.getData('currentOutlet');
    return storedCurrentOutletState ? JSON.parse(storedCurrentOutletState) : null;
  }

}
