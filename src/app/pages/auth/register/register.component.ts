import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/layouts/header/header.component';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { RegisterUser } from '../../../models/user/user';
import { ResponseDTO } from '../../../models/response/response';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { Toastr } from '../../../utilities/toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService:AuthService,private toastr: ToastrService){}

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password:new FormControl('')
  });

  registerUser(){
    const formvalue = this.registerForm?.value;
    const userData : RegisterUser = {
      name: formvalue?.name ?? '',
      email:formvalue?.email ?? '',
      password:formvalue?.password ?? ''
    };
   this.authService.registerUser(userData).subscribe({
     complete:()=>{
      console.log("completed");
      this.toastr.success("Successful Operation");
     },
     error:(e)=> {
      console.log(e);
      Toastr.error("Something went wrong", "Invalid Operation");
    }
   })
  }
}
