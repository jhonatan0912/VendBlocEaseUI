import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@components/table/table.component';
import { OutletService, ProductService } from '@data-access/services';
import { CreateProduct, Product, ProductCategory, ResponseDTO, Unit } from '@models/index';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { first } from 'rxjs';
import { OutletComponent } from '../outlet/outlet.component';

@Component({
  selector: 'app-outlet-products',
  standalone: true,
  templateUrl: './outlet-products.component.html',
  styleUrl: './outlet-products.component.css',
  imports: [OutletComponent, CardModule, CardModule, TableModule, ButtonModule, DialogModule,
    ToolbarModule, FileUploadModule, InputNumberModule, DropdownModule, InputTextModule, RippleModule,
    ReactiveFormsModule, ConfirmPopupModule, ToastModule, TableComponent]
})
export class OutletProductsComponent {

  products: Product[] = [];
  productTypes: any = [{ id: 0, name: "Perishable" }, { id: 1, name: "Non-Perishable" }];
  productType: any = 0;
  outlet: any;
  units: Unit[] = [];
  productCategories: ProductCategory[] = [];
  productDialog: boolean = false;
  tableCols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'productCategory', header: 'Category' },
    { field: 'unit', header: 'Unit' },
    { field: 'productType', header: 'Type' }];

  constructor(private outletService: OutletService, private confirmationService: ConfirmationService, private messageService: MessageService, private productService: ProductService, private toastr: ToastrService,) {
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
    this.fetchProducts(this.outlet?.id);
    this.fetchProductCategories(this.outlet?.id);
    this.fetchUnits(this.outlet?.storeId);
  }

  showDialog() {
    this.productDialog = !this.productDialog;
  }

  createProductForm = new FormGroup({
    name: new FormControl(),
    productCategory: new FormControl(),
    unit: new FormControl(),
    productType: new FormControl()
  });

  saveProduct() {
    const formData = this.createProductForm.value;
    const data: CreateProduct = {
      name: formData.name,
      storeId: this.outlet.storeId,
      unitId: formData.unit.id,
      productCategoryId: formData.productCategory.id,
      productType: formData.productType.id
    };
    this.productService.createProduct(data).pipe(first()).subscribe({
      next: (response: ResponseDTO) => {
        if (response.status) {
          this.toastr.success(response.message);
          const newProduct = response.data as Product;
          this.products.push(newProduct);
          this.showDialog();
        }
        else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.toastr.error("Something went wrong");
      },
    });
  }

  deleteProductAPI(id: number) {
    this.productService.deleteProduct(id).pipe(first()).subscribe({
      next: (response: ResponseDTO) => {
        if (response.status) {
          this.products = this.products.filter(x => x.id !== id);
        }
        else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.toastr.error("Something went wrong");
      },
    });
  }

  deleteProduct(eventAndId: { event: Event, id: number; }) {
    const event: Event = eventAndId.event;
    const id: number = eventAndId.id;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteProductAPI(id);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  public fetchProducts(outlet: number) {
    this.outletService.getOutletProducts(outlet).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        console.log('Result', result);
        if (result.status) {
          this.products = result.data;
        }
        else {
          console.log("something went wrong");
        }
      },
      error: (err) => {
        console.log("Something went wrong");
        console.log(err);
      }
    });
  }

  public fetchProductCategories(outlet: number) {
    this.outletService.getOutletProductCategories(outlet).pipe(first()).subscribe({
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
    });
  }

  public fetchUnits(store: number) {
    this.outletService.getOutletUnits(store).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          console.log(' unit Result', result);
          this.units = result.data;
        }
        else {
          console.log("else something went wrong");
        }
      },
      error: () => {
        console.log("error Something went wrong");
      }
    });
  }
}
