import { Component } from '@angular/core';
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

@Component({
    selector: 'app-order-detail',
    standalone: true,
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.css',
    imports: [DashboardComponent]
})
export class OrderDetailComponent {

}
