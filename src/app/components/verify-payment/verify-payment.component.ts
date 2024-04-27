import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService, OrderService } from '@data-access/services';
import { ResponseDTO } from '@models/index';
import { first } from 'rxjs';

@Component({
  selector: 'app-verify-payment',
  standalone: true,
  imports: [],
  templateUrl: './verify-payment.component.html',
  styleUrl: './verify-payment.component.css'
})
export class VerifyPaymentComponent {

  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.isLoading.next(true);
    const reference = this.route.snapshot.queryParamMap.get('reference') ?? '';
    this.orderService.verifyPayment(reference).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        const orderId = result.data.id;
        this.router.navigate(['my-orders']);
        this.loadingService.isLoading.next(false);
      },
      error: (e) => {
        console.log(e);
        this.loadingService.isLoading.next(false);
      }
    });
  }
}
