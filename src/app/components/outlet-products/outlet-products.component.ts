import { Component } from '@angular/core';
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { ResponseDTO } from '../../models/response/response';
import { OutletComponent } from "../outlet/outlet.component";
import { TableModule } from 'primeng/table';
import { format } from 'date-fns';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload'
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-outlet-products',
  standalone: true,
  templateUrl: './outlet-products.component.html',
  styleUrl: './outlet-products.component.css',
  imports: [OutletComponent, CardModule, CardModule, TableModule, ButtonModule, DialogModule,
    ToolbarModule, FileUploadModule, InputNumberModule, DropdownModule, InputTextModule, RippleModule,
  ReactiveFormsModule]
})
export class OutletProductsComponent {

  products: any;
  outlet: any;
  productCategories: any;
  productDialog: boolean = false;

  constructor(private outletService: OutletService) {
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
    this.fetchProducts(this.outlet?.id);
    this.fetchProductCategories(this.outlet?.id);
  }

  saveProduct() {
    throw new Error('Method not implemented.');
  }

  showDialog() {
    this.productDialog = !this.productDialog;
  }

  createProductForm = new FormGroup({
    name: new FormControl()
  });


  createProduct(){

  }

  public fetchProducts(outlet: number) {
    console.log('outlet ', outlet);
    this.outletService.getOutletProducts(outlet).subscribe({
      next: (result: ResponseDTO) => {
        console.log('Result', result);
        if (result.status) {
          this.products = result.data;
        }
        else {
          console.log("something went wrong");
        }
      },
      error: () => {
        console.log("Something went wrong");
      }
    })
  }

  public fetchProductCategories(outlet:number)
  {
    this.outletService.getOutletProductCategories(outlet).subscribe({
      next: (result: ResponseDTO) => {
        console.log('Result', result);
        if (result.status) {
          this.productCategories = result.data;
        }
        else {
          console.log("something went wrong");
        }
      },
      error: () => {
        console.log("Something went wrong");
      }
    })
  }
}
