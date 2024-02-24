import { Component, OnInit } from '@angular/core';
import { StatCardComponent } from '../stat-card/stat-card.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [StatCardComponent, DashboardComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent{

  user : User | null = null ;
  constructor(private authService:AuthService) {
         
  }

  ngOnInit(){
    this.authService.user$.subscribe((response) => {
      this.user = response;
    });
  }
  stats : any[] = 
  [
    {id:1,name:"Active Order", count:22, color:'bg-vendblocgrey'},
    {id:2, name: "Completed Orders", count:250, color:'bg-vendblocyen'},
    {id:3, name: "Total Orders", count:250, color:'bg-[#0500F233]'}
  ];
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

