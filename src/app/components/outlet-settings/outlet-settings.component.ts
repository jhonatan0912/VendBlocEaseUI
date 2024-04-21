import { Component } from '@angular/core';
import { OutletComponent } from "../outlet/outlet.component";
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { Outlet } from '../../models/outlet/outlet';
import { ResponseDTO } from '../../models/response/response';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-outlet-settings',
    standalone: true,
    templateUrl: './outlet-settings.component.html',
    styleUrl: './outlet-settings.component.css',
    imports: [OutletComponent, ReactiveFormsModule, InputNumberModule, CardModule, SelectButtonModule,ButtonModule]
})
export class OutletSettingsComponent {


  constructor(private outletService:OutletService, private toastr: ToastrService){
    this.outletService.outlet$.subscribe((result) => {
      console.log('Skin', result);
      this.outlet = result;
    });
    this.updateOutletForm.setValue({name:this.outlet?.name, phone:this.outlet?.phone, address:this.outlet?.address, deliveryFee:this.outlet?.deliveryFee});
  }

  updateOutletForm = new FormGroup({
    name: new FormControl(),
    phone:new FormControl(),
    address:new FormControl(),
    deliveryFee:new FormControl()
  });



  outlet : any;
  deliveryOptions : any[] = [{label:'Yes', value:'yes'},{label:'No', value:'no'}]
  value : string = 'no';

    updateOutlet(){
      // const formValue = this.updateOutletForm.value;
      // this.outlet?.deliveryFee = formValue.deliveryFee;
      // this.outletService.createOutlet(data).subscribe({
      //   next:(response:ResponseDTO)=>{
      //     if(response.status){
      //       this.toastr.success(response.message);
      //     }
      //     else{
      //       this.toastr.error(response.message);
      //     }
      //   },
      //   error:(err) => {
      //     this.toastr.error("Something went wrong");
      //   },
      // })
    }
}
