import { Component, OnInit } from '@angular/core';
import { ResponseDTO } from '../../models/response/response';
import { OrderService } from '../../data-access/services/order/order.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrderStateService } from '../../data-access/state-management/order-state.service';

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.css',
    imports: [DashboardComponent]
})
export class MyOrdersComponent implements OnInit {

    orders : any[] = [];

    constructor(private orderService:OrderService, private orderStateService:OrderStateService){
        this.fetchOrders("adeshiname@gmail.com");
    }
    
    ngOnInit(): void {
        this.orderStateService.userOrders$.subscribe((value) => {
            this.orders = value
        });
    }

    

    fetchOrders(email:string){
        this.orderService.getUserOrders(email).subscribe({
            next:(result:ResponseDTO)=>{
                if(result.status){
                    this.orders = result.data
                    console.log(result.data);
                }
            },
            error:(e)=>{
                console.log(e);
            }
        })
    }
}
