import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/layouts/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '../../../models/user/user';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseDTO } from '../../../models/response/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService:AuthService,private toastr: ToastrService, private router:Router){}

  loginForm = new FormGroup({
    email:new FormControl(),
    password:new FormControl(),
})

login(){
  const formValue = this.loginForm.value;
  const loginData : LoginDTO = {
    email : formValue.email,
    password: formValue.password
  };
  this.authService.loginUser(loginData).subscribe({
    next:(result : ResponseDTO)=>{
      this.authService.storeToken(result.data.token);
    },
    complete:()=>{
     console.log("completed");
     const isAuthenticated : boolean = true; //this.authService.isAuthenticated();
     if(isAuthenticated) {
      this.toastr.success("Login Successful", "Successful Operation");
      this.router.navigate(['home']);
     }
     else{
      this.toastr.error("Something went wrong", 'unable to sign you in');
     }
    },
    error:(e)=> {
     console.log(e);
     this.toastr.error("Something went wrong", e);
   }
  })
}

}
