import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { CreateOutlet, Outlet, ResponseDTO, User } from '@models/index';
import { AuthService, CurrencyService, OutletService } from '@data-access/services';

@Component({
  selector: 'app-my-outlets',
  standalone: true,
  templateUrl: './my-outlets.component.html',
  styleUrl: './my-outlets.component.css',
  imports: [TableModule, DashboardComponent, ReactiveFormsModule, DropdownModule, ButtonModule, DialogModule]
})
export class MyOutletsComponent {
  customers: any = null
  loading: boolean = false;
  visible: boolean = false;
  currencies: any;
  user: User | null = null;
  outlets: any;
  showDialog() {
    this.visible = true;
  }

  constructor(private currencyService: CurrencyService,
    private outletService: OutletService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe((response) => {
      this.user = response;
      console.log(this.user);
    });

    this.currencyService.getCurrencies().pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.currencies = result.data;
        }
      },
      error: (e) => {
        console.log(e);
      }
    });


    this.outletService.getOutletsByUser(this.user?.id as string).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.currencies = result.data;
          this.outlets = result.data as Outlet[];
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  createOutletForm = new FormGroup({
    name: new FormControl(),
    currency: new FormControl(),
    storeId: new FormControl(),
  });

  navigateToOutlet(id: number) {
    const outletRoute = 'outlet/' + id;
    console.log(outletRoute);
    this.router.navigate([outletRoute]);
  }

  createOutlet() {
    const formValue = this.createOutletForm.value;
    const data: CreateOutlet = {
      name: formValue.name,
      currencyId: formValue.currency.id,
      storeId: formValue.storeId
    };
    this.outletService.createOutlet(data).pipe(first()).subscribe({
      next: (response: ResponseDTO) => {
        if (response.status) {
          this.toastr.success(response.message);
          this.visible = false;
        }
        else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.toastr.error("Something went wrong");
      },
    })
  }
}
