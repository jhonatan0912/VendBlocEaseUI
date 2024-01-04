import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './side-menu-item.component.html',
  styleUrl: './side-menu-item.component.css'
})
export class SideMenuItemComponent {
  @Input() menuName : string = '';
}
