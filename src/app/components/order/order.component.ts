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

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
    imports: [SideMenuItemComponent, CommonModule, CartItemComponent, FormsModule, DeliveryOptionComponent]
})
export class OrderComponent {
  showModalCart : boolean = false;
  outlet:number = 0;
  constructor(private toastr: ToastrService, 
    private orderService:OrderService, 
    private route:ActivatedRoute, 
    private loadingService:LoadingService,
    private localStorage:LocalService,
    private router:Router){
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.outlet = params['id']
    })
    this.fetchCategories(this.outlet);
    this.fetchInventory(this.outlet);
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
  
  cartCount : number = 0;
  categories : ProductCategory[] = [];
  allproducts : Inventory[] = [];
  products : any[] = [];
  cart: any[] = [];
  deliveryFee : number = 200;
  totalcost:number = (this.deliveryFee);
  canCheckOut:boolean = false;
  currentCategory = -1;
  selectedDeliveryMode :string = '1';
  

  deliveryModeChanged(delivery:boolean):void{
    console.log("i got ", delivery);
    if(!delivery){
      this.totalcost = this.totalcost - this.deliveryFee;
    }else{
      this.totalcost = this.totalcost + this.deliveryFee;
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
    this.totalcost = this.totalcost + (product.price);
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
    this.totalcost = this.totalcost - product.price;
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
      id:0,
      products : this.cart,
      outletId : 3,
      customerEmail : email,
      amount:this.totalcost,
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
