import { Component } from '@angular/core';
import { ResponseDTO } from '../../models/response/response';
import { OrderService } from '../../data-access/services/order/order.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.css',
    imports: [DashboardComponent]
})
export class MyOrdersComponent {
    constructor(private orderService:OrderService){
        this.fetchOrders("adeshiname@gmail.com");
    }

    orders : any[] = [];

    fetchOrders(email:string){
        this.orderService.getUserOrders(email).subscribe({
            next:(result:ResponseDTO)=>{
                if(result.status){
                    this.orders = result.data
                }else{

                }
            },
            error:(e)=>{
                console.log(e);
            }
        })
    }
}
