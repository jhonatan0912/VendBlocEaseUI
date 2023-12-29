import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO, RegisterUser } from '../../models/user/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LocalService } from '../local/local.service';

const httpOptions:any = {
  Headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url:string = 'http://localhost:3002/';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$:Observable<boolean> = this.isAuthenticatedSubject.asObservable()
  constructor(private http : HttpClient, private local:LocalService) {}

  registerUser(data:RegisterUser): Observable<any> {
    return this.http.post(this.url+'api/User/Register', data, httpOptions);
  }

  loginUser(data:LoginDTO):Observable<any>{
    return this.http.post(this.url+'api/user/login', data, httpOptions);
  }

  storeToken(token:string):void{
    this.local.saveData('token',token);
  }

  isUserAuthenticated():boolean{

    const token = this.local.getData('token');
    console.log('Adesina');
    console.log('token',token);
    if(!token) return false;
    const decodedToken = jwtDecode(token);
    const now = new Date();
    const expires = (decodedToken.exp! * 1000)
    const expiringDate = new Date(expires);
    if(expiringDate < now){
      this.logOut();
      return false}
    this.setAuthenticated(true)
    return true;
  }

  logOut():void{
    this.local.removeData('token');
    this.setAuthenticated(false)
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
}
