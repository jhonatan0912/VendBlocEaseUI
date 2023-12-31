import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink,  RouterOutlet } from '@angular/router';

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

  constructor(private authService:AuthService){}

  ngOnInit(){
    console.log("The header Component");
    this.authService.isAuthenticated$.subscribe((result) => {
      console.log(result);
      this.isAuthenticated = result;
    })
  }

}
