import { Component } from '@angular/core';
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../data-access/services/auth/auth.service';
import { LoadingService } from '../../../data-access/services/loading/loading.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseDTO } from '../../../models/response/response';
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
