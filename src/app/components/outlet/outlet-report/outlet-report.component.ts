import { Component } from '@angular/core';
import { OutletComponent } from "../outlet/outlet.component";
import { CardModule } from 'primeng/card';
import { FormControl, Form,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableComponent } from "../../table/table.component";
import { Order, OrderReport } from '../../../models/order/order';
import { OrderService } from '../../../data-access/services/order/order.service';
import { ResponseDTO } from '../../../models/response/response';
import { format } from 'date-fns';
import { OutletService } from '../../../data-access/services/outlet/outlet.service';
import { first } from 'rxjs';

@Component({
    selector: 'app-outlet-report',
    standalone: true,
    templateUrl: './outlet-report.component.html',
    styleUrl: './outlet-report.component.css',
    imports: [OutletComponent, CardModule, FormsModule ,ReactiveFormsModule, CalendarModule, DropdownModule, TableComponent]
})
export class OutletReportComponent {

  constructor(private orderService:OrderService, private outletService:OutletService){
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
  }
  total:number = 0;
  outlet : any;
  date: Date | undefined;
  orders : Order[] = []; 
  reports: any[] = [{name:'Order'}];
  tableCols : any[] = [
    { field: 'customerName', header: 'Customer' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
    { field: 'paid', header: 'Paid' },
    { field: 'deliveryMode', header: 'Delivery' },
    { field: 'formattedDate', header: 'Date' },];


    showDialog(index:number){
      console.log("Button Pushed");
  }

  dateChanged(event:Date){
    console.log('Date Changed', event);
    console.log('Format', event.toISOString());
    this.fetchOrders(this.outlet.id, event.toISOString());
  }

  fetchOrders(id:number, date:string){
    this.orderService.getOutletOrdersWithDate(id,date).pipe(first()).subscribe({
        next:(result:ResponseDTO)=>{
            if(result.status){
              console.log(result.data);
              var data = result.data as OrderReport;
              this.total = data.total;
                this.orders = data.orders.map((o:Order) => ({...o, formattedDate:format(o.orderDate as Date, 'dd MMM yyyy'), customerName:o.customer.name}))
                console.log(result.data);
            }
        },
        error:(e)=>{
            console.log(e);
        }
    })
}
}
