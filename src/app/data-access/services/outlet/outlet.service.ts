import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseDTO } from '../../../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  constructor(private http:HttpClient) { }
  private baseUrl : string = environment.baseUrl;

  public getOutlets():Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/outlets');
  }

}
