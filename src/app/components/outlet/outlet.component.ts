import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { ResponseDTO } from '../../models/response/response';
import { Outlet } from '../../models/outlet/outlet';
import { ActivatedRoute, Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { OutletMenubarComponent } from "../outlet-menubar/outlet-menubar.component";
@Component({
    selector: 'app-outlet',
    standalone: true,
    templateUrl: './outlet.component.html',
    styleUrl: './outlet.component.css',
    imports: [DashboardComponent, TableModule, CardModule, MenubarModule, OutletMenubarComponent]
})
export class OutletComponent {

  outlet :Outlet | undefined = undefined;
  outletId : number = 0;

  constructor(private outletService:OutletService,private route:ActivatedRoute,private router:Router){
  }


  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.outletId = params['id']
    });
    this.fetchOutlet(this.outletId);
  }

  menuNavigator(url:string){
    this.router.navigate([url]);
  }

  public fetchOutlet(outlet:number){
    this.outletService.getOutlet(outlet).subscribe({
      next:(result:ResponseDTO) => {
        if(result.status){
          this.outlet = result.data;
          this.outletService.saveCurrentOutlet(result.data);
        }
          else{
            console.log("something went wrong");
          }
        },
        error:()=> {
          console.log("Something went wrong");
        }
    })
  }  

}
