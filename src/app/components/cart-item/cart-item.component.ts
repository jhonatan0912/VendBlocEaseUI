import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from '@models/index';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem: any;
  @Input() cart: any[] = [];

  @Output() cartItemEmitted = new EventEmitter<Cart>();

  removeItem(cart: Cart) {
    this.cartItemEmitted.emit(cart);
  }
}
