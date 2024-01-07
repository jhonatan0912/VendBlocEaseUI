import { Component } from '@angular/core';
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.css',
    imports: [DashboardComponent]
})
export class MyOrdersComponent {

}
