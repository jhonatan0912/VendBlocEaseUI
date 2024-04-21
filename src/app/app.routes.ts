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
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { MyOutletsComponent } from './components/my-outlets/my-outlets.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { OutletOrdersComponent } from './components/outlet-orders/outlet-orders.component';
import { OutletProductsComponent } from './components/outlet-products/outlet-products.component';
import { OutletInventoryComponent } from './components/outlet-inventory/outlet-inventory.component';
import { OutletSettingsComponent } from './components/outlet-settings/outlet-settings.component';

export const routes: Routes = [
    {
        path:'', redirectTo:'home', pathMatch:'full',
    },
    {
        path:'home', component:HomeComponent,
    },
    {
        path:'login', component:LoginComponent, canActivate:[authGuard]
    },
    {
        path:'verify-email/:user/:code', component:VerifyEmailComponent
    },
    {
        path:'reset-password/:user/:code', component:ResetPasswordComponent
    },
    {
        path:'register', component:RegisterComponent
    },
    {
        path:'forgot-password', component:ForgotPasswordComponent
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
        path:'order/:id', component:OrderComponent, canActivate:[authGuard]
    },
    {
        path:'verify-payment', component:VerifyPaymentComponent
    },
    {
        path:'my-orders', component:MyOrdersComponent
    },
    {
        path:'my-outlets', component:MyOutletsComponent
    },
    {
        path:'outlet/:id', component:OutletComponent
    },
    {
        path:'outlet-orders', component:OutletOrdersComponent
    },
    {
        path:'outlet-products', component:OutletProductsComponent
    },
    {
        path:'outlet-inventory', component:OutletInventoryComponent
    },
    {
        path:'outlet-settings', component:OutletSettingsComponent
    }
];
