import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-option',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delivery-option.component.html',
  styleUrl: './delivery-option.component.css'
})
export class DeliveryOptionComponent {
  selectedDeliveryMode :string = '1';
  delivery : boolean = true;

  @Input() uniqueId : string = '';  
  @Output() selectedDeliveryModeEmitter = new EventEmitter<boolean>();

  deliveryModeChanged(event:Event):void{
    this.delivery = !this.delivery;
    this.selectedDeliveryModeEmitter.emit(this.delivery);
  }
}