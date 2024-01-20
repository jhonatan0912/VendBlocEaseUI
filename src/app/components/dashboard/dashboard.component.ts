import { Component } from '@angular/core';
import { SideMenuItemComponent } from '../../components/side-menu-item/side-menu-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideMenuItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router:Router){}

  navigate(link:string){
    if(link !== ''){
      this.router.navigate([link])
    }}
}
