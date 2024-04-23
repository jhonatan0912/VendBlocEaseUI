import { Component } from '@angular/core';
import { OutletComponent } from "../outlet/outlet.component";
import { TableComponent } from "../../table/table.component";
import { Customer } from '../../../models/customer/customer';
import { OutletService } from '../../../data-access/services/outlet/outlet.service';
import { ResponseDTO } from '../../../models/response/response';

@Component({
    selector: 'app-outlet-customers',
    standalone: true,
    templateUrl: './outlet-customers.component.html',
    styleUrl: './outlet-customers.component.css',
    imports: [OutletComponent, TableComponent]
})
export class OutletCustomersComponent {

  tableCols : any[] = [
    { field: 'name', header: 'Name' },
    { field: 'phone', header: 'Phone' },
    { field: 'address', header: 'Address' },
    { field: 'email', header: 'Email' }];

    customers : Customer[] = [];
    outlet : any ;

  constructor(private outletService:OutletService){
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
  this.fetchCustomers(this.outlet?.id);
  }


    fetchCustomers(id:number){
      this.outletService.getOutletCustomers(id).subscribe({
          next:(result:ResponseDTO)=>{
              if(result.status){
                  this.customers = result.data as Customer[];
              }
          },
          error:(e)=>{
              console.log(e);
          }
      })
  }
}
