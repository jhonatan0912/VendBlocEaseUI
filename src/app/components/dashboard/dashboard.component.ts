import { Component } from '@angular/core';
import { SideMenuItemComponent } from '../../components/side-menu-item/side-menu-item.component';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideMenuItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user : User | null = null ;
  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(){
    this.authService.user$.subscribe((response) => {
      console.log(response);
      this.user = response;
    });
  }

  navigate(event:Event, link:string){
    event.preventDefault();
    if(link !== ''){
      this.router.navigate([link])
    }}
}
