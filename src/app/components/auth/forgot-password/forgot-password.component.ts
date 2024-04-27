import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '@components/layouts';
import { AuthService, LoadingService } from '@data-access/services';
import { ResponseDTO } from '@models/index';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css',
    imports: [AuthLayoutComponent, FormsModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent {
    forgotPasswordForm = new FormGroup({
        email: new FormControl()
      });

      constructor(private authService: AuthService, private toastr: ToastrService,
        private router: Router,
        private loadingService: LoadingService) { }

      forgotPassword() {
        this.authService.logOut();
        this.loadingService.isLoading.next(true);
        const formValue = this.forgotPasswordForm.value;
        this.authService.ForgotPassword(formValue.email).pipe(first()).subscribe({
          next: (result: ResponseDTO) => {
            console.log(result);
            if (result.status) {
              this.toastr.success(result.message);
            }
            else {
              this.toastr.error(result.message);
            }
            this.loadingService.isLoading.next(false);
          },
          error: (e:any) => {
            console.log(e);
            this.toastr.error("Something went wrong", "Something went wrong");
            this.loadingService.isLoading.next(false);
          }
        })
      }
}
