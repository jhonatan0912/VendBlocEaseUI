import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuItemComponent } from '@components/side-menu-item/side-menu-item.component';
import { AuthService } from '@data-access/services';
import { User } from '@models/index';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideMenuItemComponent, SidebarModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user: User | null = null;
  sidebarVisible: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.pipe(first()).subscribe((response) => {
      this.user = response;
    });
  }



  navigate(event: Event, link: string) {
    event.preventDefault();
    if (link !== '') {
      this.router.navigate([link]);
    }
  }
}
