import { Component } from '@angular/core';
import { StatCardComponent } from '../stat-card/stat-card.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [StatCardComponent, DashboardComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  stats : any[] = 
  [
    {id:1,name:"Active Order", count:22, color:'bg-vendblocgrey'},
    {id:2, name: "Completed Orders", count:250, color:'bg-vendblocyen'},
    {id:3, name: "Total Orders", count:250, color:'bg-[#0500F233]'}
  ];
}
