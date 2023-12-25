import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/layouts/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '../../../models/user/user';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Toastr } from '../../../utilities/toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService:AuthService,private toastr: ToastrService){}

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
    complete:()=>{
     console.log("completed");
     this.toastr.success("Login Successful", "Successful Operation")
    },
    error:(e)=> {
     console.log(e);
     this.toastr.error("Something went wrong", e);
   }
  })
}

}
