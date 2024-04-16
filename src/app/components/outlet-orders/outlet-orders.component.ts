import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import {TagModule} from 'primeng/tag'
import { OutletComponent } from "../outlet/outlet.component";
import { OrderService } from '../../data-access/services/order/order.service';
import { ResponseDTO } from '../../models/response/response';
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { Order } from '../../models/order/order';
import { format } from 'date-fns';

@Component({
    selector: 'app-outlet-orders',
    standalone: true,
    templateUrl: './outlet-orders.component.html',
    styleUrl: './outlet-orders.component.css',
    imports: [CardModule, TableModule, ButtonModule, TagModule, OutletComponent]
})
export class OutletOrdersComponent {

  constructor(private orderService:OrderService, private outletService:OutletService){
    this.outletService.outlet$.subscribe((result) => {
        console.log('Result here', result);
        this.outlet = result;
      });
    this.fetchOrders(this.outlet?.id);
  }

  outlet : any;
  
  orders : any;

  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
      default:
      return 'success';
    }
}

fetchOrders(id:number){
    this.orderService.getOutletOrders(id).subscribe({
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
