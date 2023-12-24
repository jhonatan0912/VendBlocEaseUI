import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
     CommonModule,
     FormsModule,
     ReactiveFormsModule, 
     RegisterComponent,
      LoginComponent,
       RouterOutlet
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VendBlocEase';
}
