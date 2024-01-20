import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu-item.component.html',
  styleUrl: './side-menu-item.component.css'
})
export class SideMenuItemComponent {
  @Input() menuName : string = '';
  @Input() link : string = '';


  constructor(private router: Router){}

  navigate(){
    if(this.link !== ''){
      this.router.navigate([this.link])
    }
    
  }
}
