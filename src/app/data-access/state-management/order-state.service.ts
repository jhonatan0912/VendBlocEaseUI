import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Order } from "../../models/order/order";
import { OrderService } from "../services/order/order.service";

@Injectable({
    providedIn: 'root'
  })

export class OrderStateService implements OnInit{
    private userOrdersSubject = new BehaviorSubject<Order[]>([]);

    userOrders$ = this.userOrdersSubject.asObservable();

    constructor(private orderService:OrderService){}

    ngOnInit(): void {
        
    }
}