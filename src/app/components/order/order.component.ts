import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SideMenuItemComponent } from "../side-menu-item/side-menu-item.component";
import { OrderService } from '../../services/order/order.service';
import { ResponseDTO } from '../../models/response/response';
import { ProductCategory } from '../../models/product-category/product-category';
import { Product } from '../../models/product/product';
import { Order } from '../../models/order/order';
import { Inventory } from '../../models/inventory/inventory';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
    imports: [SideMenuItemComponent]
})
export class OrderComponent {
 
  constructor(private toastr: ToastrService, private orderService:OrderService){
    //this.categoryProducts(1);
  }

  ngOnInit() {
    this.fetchCategories(3);
    this.fetchInventory(3);
}
  
  public fetchCategories(outletId:number){
    this.orderService.getProductsCategories(3).subscribe({
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

  public fetchInventory(outletId:number){
    this.orderService.getInventoryByOutlet(3).subscribe({
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

  categoryProducts(productCategoryId:number){
    this.products = this.allproducts.filter(x=>x.productCategoryId === productCategoryId)
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
    const index = this.products.findIndex(x=>x.productId == productId);
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
    this.totalcost = this.totalcost - (product.price)
    const item = this.products.findIndex(x=>x.productId == product.productId)
    this.cart.splice(item, 1);
    this.toastr.warning('Removing item from cart', 'Success')
  }

  checkout(){

    const order : Order = {
      products : this.cart,
      outletId : 3,
      customerEmail : 'adeshiname@gmail.com',
      amount:this.totalcost
    };
    console.log("Products to buy", this.cart);
    this.orderService.checkout(order).subscribe({
      next:(result)=>{
        if(result.status){
          console.log(result);
          window.location.href = result.data;
        }
      },
      error:(e) => {
        console.log(e);
      }
    })
  }

}
