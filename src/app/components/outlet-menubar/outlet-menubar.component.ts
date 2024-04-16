import { Component, Input } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { OutletService } from '../../data-access/services/outlet/outlet.service';

@Component({
  selector: 'app-outlet-menubar',
  standalone: true,
  imports: [ CardModule,MenubarModule],
  templateUrl: './outlet-menubar.component.html',
  styleUrl: './outlet-menubar.component.css'
})
export class OutletMenubarComponent {
  outlet : any ;

  menuItems : MenuItem[];

  constructor(private outletService:OutletService){
    this.menuItems = this.getMenuItems()
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
  }

  getMenuItems(): MenuItem[] {
    return [
      { label: 'Sales', icon: PrimeIcons.SHOPPING_CART },
      { label: 'Products', icon: PrimeIcons.BOOKMARK,  },
      { label: 'Customers', icon: PrimeIcons.USER },
      { label: 'Inventory', icon: PrimeIcons.LIST },   
      { label: 'Orders', icon: PrimeIcons.SHOPPING_BAG, routerLink:'/outlet-orders' },
    ]
  }
}
