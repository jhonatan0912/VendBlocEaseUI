import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { first } from 'rxjs';
import { AuthService, LoadingService } from '@data-access/services';
import { InfoComponent } from '@components/info/info.component';
import { AuthLayoutComponent, HeaderComponent } from '@components/layouts';
import { RegisterUser, ResponseDTO } from '@models/index';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [RouterOutlet,
    RouterLink, HeaderComponent, ReactiveFormsModule, AuthLayoutComponent, InfoComponent]
})
export class RegisterComponent {

  constructor(private authService: AuthService, private toastr: ToastrService,
    private loadingService: LoadingService, private router: Router) { }

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  registerUser() {
    this.loadingService.isLoading.next(true);
    const formvalue = this.registerForm?.value;
    const userData: RegisterUser = {
      name: formvalue?.name ?? '',
      email: formvalue?.email ?? '',
      password: formvalue?.password ?? ''
    };
    this.authService.registerUser(userData).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.toastr.success(result.message, 'Proceed to your email for verification');
          this.router.navigate(['login']);
        }
        else {
          this.toastr.error(result.message);
        }
        this.loadingService.isLoading.next(false);
      },
      complete: () => {
      },
      error: (e) => {
        console.log(e);
        this.toastr.error("Something went wrong", "Invalid Operation");
        this.loadingService.isLoading.next(false);
      }
    });
  }
}
