import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeaderComponent } from "./components/layouts/header/header.component";
import { LandingComponent } from './pages/landing/landing.component';
import { AuthService } from './services/auth/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RegisterComponent,
        LoginComponent,
        LandingComponent,
        HeaderComponent,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgxSpinnerModule]
})
export class AppComponent {
  title = 'VendBlocEase';

  constructor(private authService : AuthService, private router: Router){
  }


  ngOnInit():void{
    console.log('Starting Application');
    const isAuthenticated : boolean = this.authService.isUserAuthenticated();
    if(!isAuthenticated){
      console.log("User is not Authenticated");
      this.router.navigate(['login'])
    }
    else{
      console.log("User is Authenticated");
      this.router.navigate(['home'])
    }
   
  }
}
