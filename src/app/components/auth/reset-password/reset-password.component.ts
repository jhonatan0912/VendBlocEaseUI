import { Component } from '@angular/core';
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";
import { FormsModule,FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../data-access/services/auth/auth.service';
import { ActivatedRoute,  Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../../data-access/services/loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { LoginDTO, ResetPasswordDTO } from '../../../models/user/user';
import { ResponseDTO } from '../../../models/response/response';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css',
    imports: [AuthLayoutComponent, FormsModule, RouterOutlet,RouterLink,ReactiveFormsModule]
})
export class ResetPasswordComponent {

  code : string = '';
  user : string = '';

  resetPasswordForm = new FormGroup({
    email: new FormControl(),
    code: new FormControl(),
    password: new FormControl(),
  })

  constructor(private authService: AuthService, private toastr: ToastrService,
    private router: Router, private route:ActivatedRoute,
    private loadingService: LoadingService){}

  ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.route.params.subscribe(params =>{
      this.user = params['user'];
      this.code = params['code'];
    });
    this.authService.GetUserById(this.user).subscribe({
      next: (result: ResponseDTO) => {
        console.log("Getting user response",result);
        if (result.status) {
          this.resetPasswordForm.value.email = result.data.email;
        }
        else {
          this.toastr.error(result.message);
        }
        this.loadingService.isLoading.next(false);
      }
    })
  }

  
  resetPassword(){
    this.loadingService.isLoading.next(true);
    const formValue = this.resetPasswordForm.value;
    const resetData: ResetPasswordDTO = {
      email: formValue.email,
      password: formValue.password,
      code:this.code
    };
    this.authService.resetPassword(resetData).subscribe({
      next: (result: ResponseDTO) => {
        console.log(result);
        if (result.status) {
          this.toastr.success(result.message);
          this.router.navigate(['login']);
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
