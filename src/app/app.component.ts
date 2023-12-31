import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeaderComponent } from "./components/layouts/header/header.component";
import { LandingComponent } from './pages/landing/landing.component';
import { AuthService } from './services/auth/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { OrderComponent } from './components/order/order.component';
import { FooterComponent } from './components/layouts/footer/footer.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HttpClientModule,
        CommonModule,
        RouterOutlet,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        RegisterComponent,
        LoginComponent,
        LandingComponent,
        OrderComponent,
        HeaderComponent,
        FooterComponent,
        RouterModule,
        NgxSpinnerModule,
      AuthLayoutComponent
      ]
})
export class AppComponent {
  title = 'VendBlocEase';

  constructor(private authService : AuthService, private router: Router){
  }


  ngOnInit():void{
    console.log('Starting Application');
    // const isAuthenticated : boolean = this.authService.isUserAuthenticated();
    // if(!isAuthenticated){
    //   this.router.navigate(['login'])
    // }
  }
}
