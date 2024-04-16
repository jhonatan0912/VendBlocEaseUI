import { Component } from '@angular/core';
import { Router, RouterLink,  RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../data-access/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ 
    RouterOutlet,
    RouterLink, CommonModule, OverlayPanelModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated = true;
  profileDropDown = false;
  name:string = environment.me

  constructor(private authService:AuthService, private router:Router){
    console.log('Initial',this.isAuthenticated);
    this.authService.isAuthenticated$.subscribe((result) => {
      console.log(result)
      this.isAuthenticated = result;
    })
  }

  ngOnInit(){
    
  }

  toggleProfileDropdown() {
    this.profileDropDown = !this.profileDropDown
  }

  logout(){
    this.authService.logOut();
    this.router.navigate(['login']);
  }
};