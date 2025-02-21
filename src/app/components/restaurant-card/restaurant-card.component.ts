import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {
  @Input() outlet : string = ''
  @Input() store : string = ''
  @Input() outletId : string = ''
  @Input() storeId : string = ''
}
