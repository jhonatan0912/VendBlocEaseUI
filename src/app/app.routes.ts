import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { EmailVerificationComponent } from './pages/auth/email-verification/email-verification.component';
import { authGuard } from './guards/auth.guard';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

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
        path:'order', component:OrderComponent, canActivate:[authGuard]
    },
    {
        path:'my-orders', component:MyOrdersComponent
    }
];
