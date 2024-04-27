import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import {TagModule} from 'primeng/tag'
import { OutletComponent } from "../outlet/outlet.component";
import { OrderService } from '../../../data-access/services/order/order.service';
import { ResponseDTO } from '../../../models/response/response';
import { OutletService } from '../../../data-access/services/outlet/outlet.service';
import { Order } from '../../../models/order/order';
import { format } from 'date-fns';
import { DialogModule } from 'primeng/dialog';
import { TableComponent } from "../../table/table.component";
import { first } from 'rxjs';

@Component({
    selector: 'app-outlet-orders',
    standalone: true,
    templateUrl: './outlet-orders.component.html',
    styleUrl: './outlet-orders.component.css',
    imports: [CardModule, TableModule, ButtonModule, TagModule, OutletComponent, DialogModule, TableComponent]
})
export class OutletOrdersComponent {

  constructor(private orderService:OrderService, private outletService:OutletService){
    this.outletService.outlet$.subscribe((result) => {
        this.outlet = result;
      });
    this.fetchOrders(this.outlet?.id);
  }

  outlet : any;
  orders : Order[] = [];
  currentOrder : any = null;
  showDetail : boolean = false;
  dialogVisible : boolean = false;

  tableCols : any[] = [
    { field: 'customerName', header: 'Customer' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
    { field: 'paid', header: 'Paid' },
    { field: 'deliveryMode', header: 'Delivery' },
    { field: 'formattedDate', header: 'Date' },];

  showDialog(index:number){
    console.log("Button Pushed");
    this.currentOrder = this.orders[index];
    this.dialogVisible = true;
}

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
    this.orderService.getOutletOrders(id).pipe(first()).subscribe({
        next:(result:ResponseDTO)=>{
            if(result.status){
                this.orders = result.data.orders.map((o:Order) => ({...o, formattedDate:format(o.orderDate as Date, 'dd MMM yyyy'), customerName:o.customer.name}))
                console.log(result.data);
            }
        },
        error:(e)=>{
            console.log(e);
        }
    })
}
}
