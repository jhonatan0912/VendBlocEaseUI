import { Injectable, OnInit } from "@angular/core";
import { AuthService } from '@data-access/services';
import { User } from '@models/index';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthStateService implements OnInit {
    private userSubject = new BehaviorSubject<User[]>([]);
    private userEmailSubject = new BehaviorSubject<string>('');

    user$ = this.userSubject.asObservable();
    userEmail$ = this.userEmailSubject.asObservable();

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.userEmail$.subscribe;
    }
}