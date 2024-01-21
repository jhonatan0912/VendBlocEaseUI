import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../data-access/services/order/order.service';
import { ResponseDTO } from '../../models/response/response';

@Component({
  selector: 'app-verify-payment',
  standalone: true,
  imports: [],
  templateUrl: './verify-payment.component.html',
  styleUrl: './verify-payment.component.css'
})
export class VerifyPaymentComponent {
 
  reference:string = '';

  constructor(private route:ActivatedRoute, private router:Router, private orderService:OrderService){}

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.reference = params['reference']
    })
    this.orderService.verifyPayment(this.reference).subscribe({
      next:(result:ResponseDTO) => {
        console.log("Completed", result)
        const orderId = result.data.id
        this.router.navigate(['my-orders'])
      },
      error:(e)=> {
        console.log(e);
      }
    })

}
}
