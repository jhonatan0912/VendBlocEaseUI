import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/response/response';
import { environment } from '../../../../environments/environment';
import { Currency } from '../../../models/currency/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currenciesSubjects = new BehaviorSubject<Currency[]| null>(null);

  currencies$:Observable<Currency[] | null> = this.currenciesSubjects.asObservable();

  constructor(private http:HttpClient) { }
  private baseUrl : string = environment.baseUrl;

  public getCurrencies():Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.baseUrl+'api/currency');
  }
}
