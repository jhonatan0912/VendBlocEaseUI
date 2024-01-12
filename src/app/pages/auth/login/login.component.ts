import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/layouts/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '../../../models/user/user';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseDTO } from '../../../models/response/response';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from '../../../components/layouts/auth-layout/auth-layout.component';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    HeaderComponent,
    ReactiveFormsModule,
    AuthLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private toastr: ToastrService,
    private router: Router,
    private loadingService: LoadingService) { }

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  login() {
    this.loadingService.isLoading.next(true);
    const formValue = this.loginForm.value;
    const loginData: LoginDTO = {
      email: formValue.email,
      password: formValue.password
    };
    this.authService.loginUser(loginData).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.authService.storeToken(result.data.token);
        }
        else {
          this.toastr.error(result.message);
        }
        this.loadingService.isLoading.next(false);
      },
      complete: () => {

        const isAuthenticated: boolean = this.authService.isUserAuthenticated();
        if (isAuthenticated) {
          this.loadingService.isLoading.next(false);
          this.toastr.success("Login Successful", "Successful Operation");
          this.router.navigate(['home']);
        }
      },
      error: (e) => {
        console.log(e);
        this.toastr.error("Something went wrong", "Something went wrong");
        this.loadingService.isLoading.next(false);
      }
    })
  }

}
