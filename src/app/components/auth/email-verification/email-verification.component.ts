import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../../components/layouts/auth-layout/auth-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResponseDTO } from '../../../models/response/response';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../data-access/services/auth/auth.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterLink,AuthLayoutComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {

  constructor(private authService : AuthService, private toastr : ToastrService){}
  email = '';

  requestVerificationForm = new FormGroup({
    email:new FormControl()
})

  requestVerification(){
    const formValue = this.requestVerificationForm.value;
    this.authService.requestEmailVerification(formValue.email).subscribe({
      next : (response:ResponseDTO)=>{
        if(response.status){
          this.toastr.success(response.message);
        }
        else{
          this.toastr.error(response.message)
        }
      },
    error : (e) => {
      this.toastr.error("Something went wrong");
    }
    });
  }
}
