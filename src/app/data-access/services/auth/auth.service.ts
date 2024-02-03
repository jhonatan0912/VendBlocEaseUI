import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LocalService } from '../local/local.service';
import { LoginDTO, RegisterUser, User } from '../../../models/user/user';
import { environment } from '../../../../environments/environment';

const httpOptions:any = {
  Headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url:string = environment.baseUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.getInitialAuthState());
  private userSubject = new BehaviorSubject<User | null>(this.getInitialUserState());
  private userEmailSubject = new BehaviorSubject<string>('');

  user$:Observable<User | null> = this.userSubject.asObservable();
  userEmail$ = this.userEmailSubject.asObservable();
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

  storeData(key:string, value:string):void{
    this.local.saveData(key, value);
  }

  fetchLocalData(key:string){
    return this.local.getData(key);
  }

  saveUserDetails(loginData:any){
    this.storeData('token',loginData.token);
    const decodedToken : any = jwtDecode(loginData.token);
    const newuser : User = {
      name : decodedToken.name as string,
      email: decodedToken.email as string
    }
    this.storeData('name', newuser.name);
    this.setUser(newuser);
    console.log('user data', newuser);
    console.log(this.user$)
  }

  isUserAuthenticated():boolean{
    const token = this.fetchLocalData('token');
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

  setUser(user:User):void{
    this.userSubject.next(user);
    this.local.saveData('user', JSON.stringify(user));
  }

  private getInitialUserState(): User | null {
    const storedUserState = this.local.getData('user');
    return storedUserState ? JSON.parse(storedUserState) : null;
  }
}
