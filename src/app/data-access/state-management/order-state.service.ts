import { Injectable, OnInit } from "@angular/core";
import { OrderService } from '@data-access/services';
import { Order } from '@models/index';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class OrderStateService implements OnInit {
  private userOrdersSubject = new BehaviorSubject<Order[]>([]);

  userOrders$ = this.userOrdersSubject.asObservable();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

  }
}