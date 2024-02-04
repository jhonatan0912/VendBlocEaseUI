import { Component, Injectable, Injector } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NbCardModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSpinnerModule, NbSpinnerService, NbThemeModule, NbThemeService } from '@nebular/theme';
import { DOCUMENT } from '@angular/common';

function createDocument(): Document {
    return document;
  }

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-nebula-sample',
    standalone: true,
    templateUrl: './nebula-sample.component.html',
    styleUrl: './nebula-sample.component.css',
    imports: [DashboardComponent,
         NbCardModule,
         NbLayoutModule,
         NbSidebarModule,
         NbSpinnerModule
],providers:[{ provide: DOCUMENT, useFactory: createDocument }]
})
export class NebulaSampleComponent {

}
