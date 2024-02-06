import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SideMenuItemComponent } from "../side-menu-item/side-menu-item.component";
import { ResponseDTO } from '../../models/response/response';
import { ProductCategory } from '../../models/product-category/product-category';
import { Order } from '../../models/order/order';
import { Inventory } from '../../models/inventory/inventory';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../data-access/services/order/order.service';
import { LoadingService } from '../../data-access/services/loading/loading.service';
import { LocalService } from '../../data-access/services/local/local.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { FormsModule } from '@angular/forms';
import { DeliveryOptionComponent } from "../delivery-option/delivery-option.component";
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { Outlet } from '../../models/outlet/outlet';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
    imports: [SideMenuItemComponent, CommonModule, CartItemComponent, FormsModule, DeliveryOptionComponent]
})
export class OrderComponent {
  showModalCart : boolean = false;
  outletId:number = 0;
  outlet :Outlet | undefined = undefined;
  cartCount : number = 0;
  categories : ProductCategory[] = [];
  allproducts : Inventory[] = [];
  products : any[] = [];
  cart: any[] = [];
  deliveryFee : number = this.outlet?.deliveryFee ?? 0;
  ordersCost: number = 0;
  totalcost:number = 0;
  canCheckOut:boolean = false;
  currentCategory = -1;
  selectedDeliveryMode : number = 1;
  delivery : boolean = true;
  
  constructor(private toastr: ToastrService, 
    private orderService:OrderService, 
    private outletService:OutletService,
    private route:ActivatedRoute, 
    private loadingService:LoadingService,
    private localStorage:LocalService,
    private router:Router){
  }

  private outletSubject = new BehaviorSubject<any>('');

  outlet$:Observable<any | null> = this.outletSubject.asObservable();

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.outletId = params['id']
    })
    this.fetchOutlet(this.outletId);
    this.fetchCategories(this.outletId);
    this.fetchInventory(this.outletId);
    this.outlet$.subscribe((response) => {
        this.outlet = response;
        this.deliveryFee = this.outlet?.deliveryFee ?? 0
    });
  }
  public fetchOutlet(outlet:number){
    this.outletService.getOutlet(outlet).subscribe({
      next:(result:ResponseDTO) => {
        if(result.status){
          this.outletSubject.next(result.data);
        }
          else{
            console.log("something went wrong");
          }
        },
        error:()=> {
          console.log("Something went wrong");
        }
    })
  }  

  public fetchCategories(outlet:number){
    this.orderService.getProductsCategories(outlet).subscribe({
      next:(result:ResponseDTO)=>{
        if(result.status){
          this.categories = result.data
        }
        else{
          console.log("something went wrong");
        }
      },
      error:()=> {
        console.log("Something went wrong");
      }
    })
  }

  public fetchInventory(outlet:number){
    this.orderService.getInventoryByOutlet(outlet).subscribe({
      next:(result:ResponseDTO)=>{
        if(result.status){
          this.allproducts = result.data
        }
        else{
          console.log("Unable to fetch inventory")
        }
      }
    })
  }

  deliveryModeChanged(delivery:boolean):void{
    console.log("i got ", delivery);
    this.delivery = delivery;
    if(!delivery){
      this.deliveryFee = 0;
      this.selectedDeliveryMode = 0;
    }else{
      this.deliveryFee = this.outlet?.deliveryFee as number;
      this.selectedDeliveryMode = 1;
    }
  }

  categoryProducts(event: Event, productCategoryId:number){
    event.preventDefault();
    this.currentCategory = productCategoryId;
    this.products = this.allproducts.filter(x=>x.productCategoryId === productCategoryId);
    console.log(this.products);
  }

  addToCart(product:any){
    const price = product.salesPrice * product.orderQuantity;
    product.price = price;
    this.ordersCost = this.ordersCost + (product.price);
    const isProductInCart = this.cart.findIndex(x=>x.productId == product.productId);
    if(isProductInCart < 0){
      this.cart.push({...product});
      this.cartCount++;
    }
    else{
      this.cart[isProductInCart].orderQuantity += product.orderQuantity;
      this.cart[isProductInCart].price += (product.price);
    }
    product.orderQuantity = 1;
    this.toastr.success('Added To Cart', 'Success')
  }

  updateProductQuantity(productId:number, increment : boolean){
    const index = this.products.findIndex(x=>x.productId === productId);
    if(increment){
      this.products[index].orderQuantity = this.products[index].orderQuantity + 1;
    }
    else{
      if(this.products[index].orderQuantity > 1){
        this.products[index].orderQuantity = this.products[index].orderQuantity - 1;
      }
    }
  }

  removeFromCart(product:any){
    this.cartCount--;
    this.ordersCost = this.ordersCost - product.price;
    const itemIndex = this.cart.findIndex(x=>x.productId === product.productId);
    if(itemIndex !== -1){
      this.cart.splice(itemIndex, 1);
    }
  }

  showmodal(){
    this.showModalCart = !this.showModalCart;
    const mydialog = document.getElementById('dialog');
    // if(this.showModalCart){
    //  // mydialog?.classList.remove('hidden');
    //   // mydialog?.classList.remove('opacity-0');
    //   // console.log("trying to show modal");
    // }
    // else{
    //   // mydialog?.classList.add('opacity-0');
    //   //mydialog?.classList.add('hidden');
    // }
  }

  checkout(){
    const email = this.localStorage.getData('email');
    if(!email) this.router.navigate(['login'])
    if(this.cartCount < 1){
      this.toastr.warning("Add Items to cart Before Checking Out");
      return;
    }
    this.loadingService.isLoading.next(true);
    const order : Order = {
      products : this.cart,
      outletId : this.outletId,
      customerEmail : email,
      amount:this.ordersCost + this.deliveryFee,
      deliveryMode:this.selectedDeliveryMode
    };
    this.orderService.checkout(order).subscribe({
      next:(result:ResponseDTO)=>{
        if(result.status){
          this.loadingService.isLoading.next(false);
          this.toastr.success('Trying to set up your payment link', 'Order Created')
          window.location.href = result.data;
         
        }
        else{
          this.toastr.error(result.message);
          this.loadingService.isLoading.next(false);
        }
      },
      error:(e) => {        
        this.loadingService.isLoading.next(false);
      }
    })
  }

}
