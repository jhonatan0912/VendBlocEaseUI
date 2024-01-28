import { Component, OnInit } from '@angular/core';
import { ResponseDTO } from '../../models/response/response';
import { OrderService } from '../../data-access/services/order/order.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrderStateService } from '../../data-access/state-management/order-state.service';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { Order } from '../../models/order/order';

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.css',
    imports: [DashboardComponent]
})
export class MyOrdersComponent {

    orders : any[] = [];

    constructor(private orderService:OrderService,
         private authService:AuthService,
         private orderStateService:OrderStateService,
         private router:Router){
            this.fetchOrders();
    }
    
    // ngOnInit(): void {
    //     this.orderStateService.userOrders$.subscribe((value) => {
    //         this.orders = value.map(o => ({...o, formattedDate:format(o.orderDate as Date, 'MM/dd/yyyy')}))
    //     });
    // }

    fetchOrders(){
        const email = this.authService.fetchLocalData('email');
        if(!email) this.router.navigate(['login'])
        this.orderService.getUserOrders(email).subscribe({
            next:(result:ResponseDTO)=>{
                if(result.status){
                    this.orders = result.data.map((o:Order) => ({...o, formattedDate:format(o.orderDate as Date, 'dd MMM yyyy')}))
                    console.log(result.data);
                }
            },
            error:(e)=>{
                console.log(e);
            }
        })
    }
}
