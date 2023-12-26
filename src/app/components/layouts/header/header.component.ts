import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated = false;

  constructor(private authService:AuthService){}

  ngOnInit(){
    this.authService.isAuthenticated$.subscribe((result) => {
      this.isAuthenticated = result;
    })
  }

}
