import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { authGuard } from './utils/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { EmailVerificationComponent } from './components/auth/email-verification/email-verification.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { VerifyPaymentComponent } from './components/verify-payment/verify-payment.component';
import { NebulaSampleComponent } from './components/nebula-sample/nebula-sample.component';

export const routes: Routes = [
    {
        path:'', redirectTo:'home', pathMatch:'full',
    },
    {
        path:'home', component:HomeComponent,
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'register', component:RegisterComponent
    },
    {
        path:'request-verication', component:EmailVerificationComponent
    },
    {
        path:'landing', component:LandingComponent
    },
    {
        path:'dashboard', component:DashboardComponent
    },
    {
        path:'info', component:PersonalInfoComponent
    },
    {
        path:'order/:id', component:OrderComponent , canActivate:[authGuard]
    },
    {
        path:'verify-payment', component:VerifyPaymentComponent , canActivate:[authGuard]
    },
    {
        path:'my-orders', component:MyOrdersComponent
    },
    {
        path:'nebula-sample', component:NebulaSampleComponent
    }
];
