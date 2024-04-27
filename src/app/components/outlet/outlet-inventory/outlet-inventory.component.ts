import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@components/table/table.component';
import { InventoryService, OutletService } from '@data-access/services';
import { CreateInventory, Inventory, ResponseDTO } from '@models/index';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { first } from 'rxjs';
import { OutletComponent } from "../outlet/outlet.component";

@Component({
  selector: 'app-outlet-inventory',
  standalone: true,
  templateUrl: './outlet-inventory.component.html',
  styleUrl: './outlet-inventory.component.css',
  imports: [OutletComponent, TableComponent, InputTextModule, DropdownModule, ReactiveFormsModule, DialogModule,
    InputNumberModule
  ]
})
export class OutletInventoryComponent {

  inventories: Inventory[] = [];
  outlet: any;
  addDialog: boolean = false;
  value1: number = 0;
  products: any[] = [];

  constructor(private inventoryService: InventoryService, private outletService: OutletService,
    private toastr: ToastrService
  ) {
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
    this.fetchInventory(this.outlet.id);
    this.fetchProducts(this.outlet.id);
  }

  tableCols: any[] = [
    { field: 'product', header: 'Product' },
    { field: 'productCategory', header: 'Category' },
    { field: 'unit', header: 'Unit' },
    { field: 'price', header: 'Price' },
    { field: 'quantity', header: 'Quantity' },];


  showAddDialog() {
    this.addDialog = !this.addDialog;
  }

  deleteInventory(eventAndId: { event: Event, id: number; }) {

  }

  createInventoryForm = new FormGroup({
    name: new FormControl(),
    product: new FormControl(),
    costPrice: new FormControl(),
    salesPrice: new FormControl(),
    quantity: new FormControl(),
    manufacturingDate: new FormControl(),
    expiringDate: new FormControl(),
    remark: new FormControl(),
  });

  addInventory() {
    const formData = this.createInventoryForm.value;
    const data: CreateInventory = {
      productId: formData.product.id,
      remark: formData.remark,
      salesPrice: formData.salesPrice,
      costPrice: formData.costPrice,
      manufacturingDate: formData.manufacturingDate,
      expiringDate: formData.expiringDate,
      quantity: formData.quantity,
      outletId: this.outlet.id
    };
    this.inventoryService.createInventory(data).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          const newInventory = result.data as Inventory;
          const isInventoryInList = this.inventories.findIndex(x => x.productId == data.productId);
          if (isInventoryInList < 0) {
            this.inventories.push(newInventory);
          }
          else {
            this.inventories[isInventoryInList].quantity = newInventory.quantity;
            this.inventories[isInventoryInList].price = newInventory.price;
            this.inventories[isInventoryInList].salesPrice = newInventory.salesPrice;
          }
          this.toastr.success(result.message);
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

  public fetchInventory(outlet: number) {
    this.inventoryService.getInventoryByOutlet(outlet).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.inventories = result.data;
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

  public fetchProducts(outlet: number) {
    this.outletService.getOutletProducts(outlet).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
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

}
