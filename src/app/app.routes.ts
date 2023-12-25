import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    {
        path:'', redirectTo:'login', pathMatch:'full',
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'signup', component:RegisterComponent
    },
    {
        path:'dashboard', component:LandingComponent
    }
];
