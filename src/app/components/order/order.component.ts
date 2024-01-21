import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SideMenuItemComponent } from "../side-menu-item/side-menu-item.component";
import { ResponseDTO } from '../../models/response/response';
import { ProductCategory } from '../../models/product-category/product-category';
import { Order } from '../../models/order/order';
import { Inventory } from '../../models/inventory/inventory';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../data-access/services/order/order.service';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
    imports: [SideMenuItemComponent, CommonModule]
})
export class OrderComponent {

  outlet:number = 0;
  constructor(private toastr: ToastrService, private orderService:OrderService, private route:ActivatedRoute){
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
          console.log(result.data);
        }
        else{
          console.log("uable to fetch inventory")
        }
      
      }
    })
  }
  
  cartCount : number = 0;
  categories : ProductCategory[] = [];
  allproducts : Inventory[] = [];
  products : any[] = [];
  cart: any[] = [];
  totalcost:number = 0;
  canCheckOut:boolean = false;

  categoryProducts(event: Event, productCategoryId:number){
    event.preventDefault();
    this.products = this.allproducts.filter(x=>x.productCategoryId === productCategoryId)
    console.log(this.products)
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
    console.log(this.cart)
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
    this.cartCount--
    this.totalcost = this.totalcost - product.price
    const itemIndex = this.cart.findIndex(x=>x.productId === product.productId)
    if(itemIndex !== -1){
      this.cart.splice(itemIndex, 1);
    }
  }

  checkout(){
    if(this.cartCount < 1){
      this.toastr.error("Add Items to cart Before Checking Out");
      return;
    }
    const order : Order = {
      id:0,
      products : this.cart,
      outletId : 3,
      customerEmail : 'adeshiname@gmail.com',
      amount:this.totalcost
    };
    console.log("Products to buy", this.cart);
    this.orderService.checkout(order).subscribe({
      next:(result:ResponseDTO)=>{
        if(result.status){
          this.toastr.success('Trying to set up your payment link', 'Order Created')
          window.location.href = result.data;
         
        }
        else{
          this.toastr.error(result.message);
        }
      },
      error:(e) => {
        console.log(e);
      }
    })
  }

}
