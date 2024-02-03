import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../../models/user/user";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
    providedIn: 'root'
  })

export class AuthStateService implements OnInit{
    private userSubject = new BehaviorSubject<User[]>([]);
    private userEmailSubject = new BehaviorSubject<string>('');

    user$ = this.userSubject.asObservable();
    userEmail$ = this.userEmailSubject.asObservable();

    constructor(private authService:AuthService){}

    ngOnInit(): void {
        this.userEmail$.subscribe
    }
}