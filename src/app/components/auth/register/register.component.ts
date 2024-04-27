import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/layouts/header/header.component';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { RegisterUser } from '../../../models/user/user';
import { ResponseDTO } from '../../../models/response/response';
import { ToastrService } from 'ngx-toastr';
import { AuthLayoutComponent } from '../../../components/layouts/auth-layout/auth-layout.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../data-access/services/auth/auth.service';
import { LoadingService } from '../../../data-access/services/loading/loading.service';
import { InfoComponent } from "../../info/info.component";
import { first } from 'rxjs';
@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [RouterOutlet,
        RouterLink, HeaderComponent, ReactiveFormsModule, AuthLayoutComponent, InfoComponent]
})
export class RegisterComponent {

  constructor(private authService:AuthService,private toastr: ToastrService, 
    private loadingService:LoadingService, private router:Router){}

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password:new FormControl('')
  });

  registerUser(){
    this.loadingService.isLoading.next(true);
    const formvalue = this.registerForm?.value;
    const userData : RegisterUser = {
      name: formvalue?.name ?? '',
      email:formvalue?.email ?? '',
      password:formvalue?.password ?? ''
    };
   this.authService.registerUser(userData).pipe(first()).subscribe({
    next:(result : ResponseDTO)=>{
      if(result.status){
        this.toastr.success(result.message, 'Proceed to your email for verification')
        this.router.navigate(['login']);
      }
      else{
        this.toastr.error(result.message);
      }
      this.loadingService.isLoading.next(false);
    },
     complete:()=>{
     },
     error:(e)=> {
      console.log(e);
      this.toastr.error("Something went wrong", "Invalid Operation");
      this.loadingService.isLoading.next(false);
    }
   })
  }
}
