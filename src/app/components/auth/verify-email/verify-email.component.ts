import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from '@components/layouts/auth-layout/auth-layout.component';
import { AuthService } from '@data-access/services/auth/auth.service';
import { ResponseDTO } from '@models/index';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  imports: [FormsModule, RouterOutlet, RouterLink, AuthLayoutComponent]
})
export class VerifyEmailComponent {
  code: string = '';
  userId: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params => {
      this.code = params['code'];
      this.userId = params['user'];
    });
    this.authService.EmailVerification(this.userId, this.code).pipe(first()).subscribe({
      next: (response: ResponseDTO) => {
        if (response.status) {
          this.toastr.success(response.message);
          this.router.navigate(['login']);
        }
        else {
          this.toastr.error(response.message);
        }
      }
    });
  }
}
