import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../data-access/services/auth/auth.service';
import { ResponseDTO } from '../../../models/response/response';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    templateUrl: './verify-email.component.html',
    styleUrl: './verify-email.component.css',
    imports: [FormsModule,RouterOutlet,RouterLink, AuthLayoutComponent]
})
export class VerifyEmailComponent {
  code: string = '';
  userId: string = '';
  constructor(private route:ActivatedRoute, private router:Router, private authService:AuthService, private toastr:ToastrService){}
  
  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params =>{
      this.code = params['code'];
      this.userId = params['user'];
    });
    this.authService.EmailVerification(this.userId, this.code).pipe(first()).subscribe({
      next : (response:ResponseDTO)=>{
        if(response.status){
          this.toastr.success(response.message);
          this.router.navigate(['login']);
        }
        else{
          this.toastr.error(response.message)
        }
      }
    });
  }
}
