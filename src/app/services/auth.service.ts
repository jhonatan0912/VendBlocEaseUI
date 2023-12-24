import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../models/user/user';
import { Observable, map } from 'rxjs';
import { Response } from '../models/response/response';

const httpOptions:any = {
  Headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url:string = 'https://localhost:7026/';
  constructor(private http : HttpClient) {}

  registerUser(data:RegisterUser): Observable<any> {
    console.log("I got your data",data);
    return this.http.post(this.url+'api/User/Register', data, httpOptions);
  }
}
