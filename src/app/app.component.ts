import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeaderComponent } from "./components/layouts/header/header.component";
import { LandingComponent } from './pages/landing/landing.component';


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
        RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent]
})
export class AppComponent {
  title = 'VendBlocEase';
}
