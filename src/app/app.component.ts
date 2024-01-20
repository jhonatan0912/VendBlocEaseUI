import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
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
        AuthLayoutComponent, LoadingComponent]
})
export class AppComponent {
  title = 'VendBlocEase';

  constructor(private authService : AuthService, private router: Router, private loadingService:LoadingService){
    // this.router.events.subscribe((event:any)=>{
    //   switch(true){
    //     case event instanceof NavigationStart:{
    //       this.loadingService.isLoading.next(true);
    //       break;
    //     }
    //     case event instanceof NavigationEnd:
    //     case event instanceof NavigationCancel:
    //     case event instanceof NavigationError:{
    //       this.loadingService.isLoading.next(false);
    //       break;
    //     }
    //   }
    // })
  }


  ngOnInit():void{
    console.log('Starting Application');
    // const isAuthenticated : boolean = this.authService.isUserAuthenticated();
    // if(!isAuthenticated){
    //   this.router.navigate(['login'])
    // }
  }
}
