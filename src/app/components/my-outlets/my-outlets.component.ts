import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CurrencyService } from '../../data-access/services/currency/currency.service';
import { Currency } from '../../models/currency/currency';
import { ResponseDTO } from '../../models/response/response';
import { CreateOutlet, Outlet } from '../../models/outlet/outlet';
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user/user';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-outlets',
    standalone: true,
    templateUrl: './my-outlets.component.html',
    styleUrl: './my-outlets.component.css',
    imports: [TableModule, DashboardComponent,ReactiveFormsModule, DropdownModule, ButtonModule, DialogModule]
})
export class MyOutletsComponent {
  customers : any = null
  loading:boolean = false;
  visible:boolean = false;
  currencies : any;
  user : User | null = null;
  outlets : any;
  showDialog(){
    this.visible = true;
  }

  constructor(private currencyService:CurrencyService,
     private outletService:OutletService,
     private toastr: ToastrService,
    private authService:AuthService,
    private router: Router,){

  }

  ngOnInit(): void {
  this.authService.user$.subscribe((response) => {
    this.user = response;
    console.log(this.user);
  });

    this.currencyService.getCurrencies().subscribe({
      next:(result:ResponseDTO)=>{
      if(result.status){
          this.currencies = result.data;
      }
  },
  error:(e)=>{
      console.log(e);
  }});


  this.outletService.getOutletsByUser(this.user?.id as string).subscribe({
    next:(result:ResponseDTO)=>{
    if(result.status){
        this.currencies = result.data;
        this.outlets = result.data as Outlet[];
    }
},
error:(e)=>{
    console.log(e);
}});
}

  createOutletForm = new FormGroup({
    name: new FormControl(),
    currency: new FormControl(),
    storeId: new FormControl(),
  });

  navigateToOutlet(id:number){
    const outletRoute = 'outlet/'+id;
    console.log(outletRoute);
    this.router.navigate([outletRoute]);
  }

  createOutlet(){
    const formValue = this.createOutletForm.value;
    const data: CreateOutlet = {
        name : formValue.name,
        currencyId: formValue.currency.id,
        storeId: formValue.storeId
    };
    this.outletService.createOutlet(data).subscribe({
      next:(response:ResponseDTO)=>{
        if(response.status){
          this.toastr.success(response.message);
          this.visible = false;
        }
        else{
          this.toastr.error(response.message);
        }
      },
      error:(err) => {
        this.toastr.error("Something went wrong");
      },
    })
  }
}
