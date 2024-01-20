import { Component } from '@angular/core';
import { RouterLink,  RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../data-access/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ 
    RouterOutlet,
    RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated = false;
  profileDropDown = false;
  name:string = environment.me

  constructor(private authService:AuthService){}

  ngOnInit(){
    console.log("The header Component");
    this.authService.isAuthenticated$.subscribe((result) => {
      console.log(result);
      this.isAuthenticated = result;
    })
  }

  toggleProfileDropdown() {
    this.profileDropDown = !this.profileDropDown
  }

}
