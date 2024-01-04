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
  private url:string = 'https://localhost:7026/';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.getInitialAuthState());

  isAuthenticated$:Observable<boolean> = this.isAuthenticatedSubject.asObservable()
  constructor(private http : HttpClient, private local:LocalService) {}

  registerUser(data:RegisterUser): Observable<any> {
    return this.http.post(this.url+'api/User/Register', data, httpOptions);
  }

  loginUser(data:LoginDTO):Observable<any>{
    return this.http.post(this.url+'api/user/login', data, httpOptions);
  }

  requestEmailVerification(email:string):Observable<any>{
    return this.http.get(this.url+'api/user/requestverification/'+email);
  }

  storeToken(token:string):void{
    this.local.saveData('token',token);
  }

  isUserAuthenticated():boolean{
    const token = this.local.getData('token');
    if(!token) return false;
    const decodedToken = jwtDecode(token);
    const now = new Date();
    const expires = (decodedToken.exp! * 1000)
    const expiringDate = new Date(expires);
    if(expiringDate < now){
      this.logOut();
      return false
    }
    this.setAuthenticated(true)
    return true;
  }

  logOut():void{
    this.local.removeData('token');
    this.setAuthenticated(false)
  }

  private getInitialAuthState(): boolean {
    const storedAuthState = this.local.getData('isAuthenticated');
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.local.saveData('isAuthenticated',JSON.stringify(isAuthenticated));
  }
}
