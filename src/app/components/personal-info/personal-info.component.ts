import { Component } from '@angular/core';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { StatCardComponent } from '@components/stat-card/stat-card.component';
import { AuthService } from '@data-access/services';
import { User } from '@models/index';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [StatCardComponent, DashboardComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {

  user: User | null = null;
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.user$.subscribe((response) => {
      this.user = response;
      console.log('User subscription from ngoninit', response);
    });
  }
  stats: any[] =
    [
      { id: 1, name: "Active Order", count: 22, color: 'bg-vendblocgrey' },
      { id: 2, name: "Completed Orders", count: 250, color: 'bg-vendblocyen' },
      { id: 3, name: "Total Orders", count: 250, color: 'bg-[#0500F233]' }
    ];
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

