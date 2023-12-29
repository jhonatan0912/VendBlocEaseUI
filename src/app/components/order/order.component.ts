import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  constructor(){
    this.categoryProducts(1);
  }
  
  cartCount : number = 0;

  categories : any[] = [
    {id:1,name:'Swallow', quantity:10},
    {id:2, name:'Protein', quantity:8},
    {id:3,name:'Drinks', quantity:12},
    {id:4,name:'Grills', quantity:13},
    {id:5,name:'Alcohol', quantity:7}
  ]

  allproducts : any[] = [
    {id:1,name:'Eba', quantity:10, unitprice:300, price:300, productCategoryId:1, orderQuantity : 1},
    {id:2, name:'Semo', quantity:8, unitprice:300, price:300,productCategoryId:1, orderQuantity : 1},
    {id:3,name:'Amala', quantity:12, unitprice:300,price:300, productCategoryId:1, orderQuantity : 1},
    {id:4,name:'Fufu', quantity:13, unitprice:300, price:300, productCategoryId:1, orderQuantity : 1},
    {id:5,name:'Santana', quantity:7, unitprice:300, price:300, productCategoryId:1, orderQuantity : 1},
    {id:6,name:'Viju (Choco)', quantity:7, unitprice:300, price:500, productCategoryId:3, orderQuantity : 1},
    {id:7,name:'Water', quantity:10, unitprice:300, price:300, productCategoryId:3, orderQuantity : 1},
    {id:8, name:'Fanta', quantity:8, unitprice:300, price:300, productCategoryId:3, orderQuantity : 1},
    {id:9,name:'Coke', quantity:12,unitprice:300, price:300, productCategoryId:3, orderQuantity : 1},
    {id:10,name:'5 Alive', quantity:13,unitprice:300, price:300, productCategoryId:3, orderQuantity : 1},
    {id:11,name:'Hollandia', quantity:7,unitprice:300, price:300, productCategoryId:3, orderQuantity : 1},
    {id:12,name:'Monster', quantity:7,unitprice:300, price:500, productCategoryId:3, orderQuantity : 1},
    {id:11,name:'Viju', quantity:7,unitprice:300, price:300, productCategoryId:3, orderQuantity : 1},
    {id:12,name:'Pulpy', quantity:7,unitprice:300, price:500, productCategoryId:3, orderQuantity : 1}
  ];

  products : any[] = [];
  cart: any[] = [];
  totalcost:number = 0;

  categoryProducts(productCategoryId:number){
    this.products = this.allproducts.filter(x=>x.productCategoryId === productCategoryId)
  }

  addToCart(product:any){
    this.cartCount++
    this.totalcost = this.totalcost + (product.price)
    this.cart.push(product)
  }

  updateProductQuantity(productId:number, increment : boolean){
    const index = this.products.findIndex(x=>x.id == productId);
    if(increment){
      this.products[index].orderQuantity = this.products[index].orderQuantity + 1;
    }
    else{
      if(this.products[index].orderQuantity > 1){
        this.products[index].orderQuantity = this.products[index].orderQuantity - 1;
      }
    }
    this.products[index].price = this.products[index].unitprice * this.products[index].orderQuantity;
  }

  removeFromCart(product:any){
    this.cartCount--
    this.totalcost = this.totalcost - (product.price)
    const item = this.products.findIndex(x=>x.id == product.id)
    this.cart.splice(item, 1);
  }

}
