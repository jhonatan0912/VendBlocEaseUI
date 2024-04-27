import { Component } from '@angular/core';
import { TableComponent } from '@components/table/table.component';
import { OutletService } from '@data-access/services';
import { Customer, ResponseDTO } from '@models/index';
import { first } from 'rxjs';
import { OutletComponent } from '../outlet/outlet.component';

@Component({
  selector: 'app-outlet-customers',
  standalone: true,
  templateUrl: './outlet-customers.component.html',
  styleUrl: './outlet-customers.component.css',
  imports: [OutletComponent, TableComponent]
})
export class OutletCustomersComponent {

  tableCols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'phone', header: 'Phone' },
    { field: 'address', header: 'Address' },
    { field: 'email', header: 'Email' }];

  customers: Customer[] = [];
  outlet: any;

  constructor(private outletService: OutletService) {
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
    this.fetchCustomers(this.outlet?.id);
  }


  fetchCustomers(id: number) {
    this.outletService.getOutletCustomers(id).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.customers = result.data as Customer[];
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
