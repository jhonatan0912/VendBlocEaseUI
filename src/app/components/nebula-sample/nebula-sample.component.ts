import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NbCardModule } from '@nebular/theme';

@Component({
    selector: 'app-nebula-sample',
    standalone: true,
    templateUrl: './nebula-sample.component.html',
    styleUrl: './nebula-sample.component.css',
    imports: [DashboardComponent, NbCardModule]
})
export class NebulaSampleComponent {

}
