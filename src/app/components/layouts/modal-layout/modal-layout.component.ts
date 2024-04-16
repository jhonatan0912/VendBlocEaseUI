import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-layout',
  standalone: true,
  imports: [],
  templateUrl: './modal-layout.component.html',
  styleUrl: './modal-layout.component.css'
})
export class ModalLayoutComponent {
  @Input() displayModal : boolean = false; 
}
