import { Component } from '@angular/core';
import { SideMenuItemComponent } from '../../components/side-menu-item/side-menu-item.component';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { User } from '../../models/user/user';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideMenuItemComponent, SidebarModule,ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user : User | null = null ;
  sidebarVisible : boolean = false;
  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(){
    this.authService.user$.pipe(first()).subscribe((response) => {
      this.user = response;
    });
  }

  

  navigate(event:Event, link:string){
    event.preventDefault();
    if(link !== ''){
      this.router.navigate([link])
    }}
}
