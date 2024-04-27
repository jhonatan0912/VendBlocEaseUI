import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { AuthService, OrderService } from '@data-access/services';
import { OrderStateService } from '@data-access/state-management';
import { Order, ResponseDTO, User } from '@models/index';
import { format } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { first } from 'rxjs';
import { ModalLayoutComponent } from "../layouts/modal-layout/modal-layout.component";

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.css',
    imports: [DashboardComponent, CommonModule, ModalLayoutComponent, TableModule, DialogModule, ButtonModule]
})
export class MyOrdersComponent {

    user: User | null = null;
    orders: Order[] = [];
    showDetail: boolean = false;
    dialogVisible: boolean = false;
    currentInvoiceOrder: any = null;

    showDialog(index: number) {
        this.currentInvoiceOrder = this.orders[index];
        this.dialogVisible = true;
    }

    constructor(private orderService: OrderService,
        private authService: AuthService,
        private orderStateService: OrderStateService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.authService.user$.subscribe((response) => {
            console.log(response);
            this.user = response;
        });
        this.fetchOrders();
    }

    showDetailEvent() {
        this.showDetail = !this.showDetail;
    }

    fetchOrders() {
        const email = this.user?.email as string;
        if (!email) this.router.navigate(['login']);
        this.orderService.getUserOrders(email).pipe(first()).subscribe({
            next: (result: ResponseDTO) => {
                if (result.status) {
                    this.orders = result.data.map((o: Order) => ({ ...o, formattedDate: format(o.orderDate as Date, 'dd MMM yyyy') }));
                    console.log(result.data);
                }
            },
            error: (e) => {
                console.log(e);
            }
        });
    }
}
