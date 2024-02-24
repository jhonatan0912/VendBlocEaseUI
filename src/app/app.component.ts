import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './data-access/services/auth/auth.service';
import { LoadingService } from './data-access/services/loading/loading.service';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { OrderComponent } from './components/order/order.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

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
        DashboardComponent,
        LandingComponent,
        OrderComponent,
        HeaderComponent,
        FooterComponent,
        RouterModule,
        NgxSpinnerModule,
        AuthLayoutComponent,
        LoadingComponent,
        CartItemComponent
]
})


export class AppComponent implements OnInit{
  title = 'VendBlocEase';
  constructor(private authService : AuthService, private router: Router, private loadingService:LoadingService){
  }


  ngOnInit():void{
    this.GuardLoader()
}

async GuardLoader(){
  this.router.events.subscribe(async (event:any)=>{
    if(event instanceof GuardsCheckStart){
      this.loadingService.isLoading.next(true);
    }
    if (event instanceof GuardsCheckEnd || event instanceof NavigationCancel) {
      this.loadingService.isLoading.next(false);
    }
});
}
}