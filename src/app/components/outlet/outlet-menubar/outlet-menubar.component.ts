import { Component, Input } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { OutletService } from '../../../data-access/services/outlet/outlet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-outlet-menubar',
  standalone: true,
  imports: [ CardModule,MenubarModule],
  templateUrl: './outlet-menubar.component.html',
  styleUrl: './outlet-menubar.component.css'
})
export class OutletMenubarComponent {
  outlet : any;
  menuItems : MenuItem[];

  constructor(private outletService:OutletService, private route:ActivatedRoute){
    this.outletService.outlet$.subscribe((result) => {
      this.outlet = result;
    });
    this.menuItems = this.getMenuItems();
  }

  getMenuItems(): MenuItem[] {
    return [
      { label: 'Sales', icon: PrimeIcons.SHOPPING_CART, disabled:true,visible:false   },
      { label: 'Orders', icon: PrimeIcons.SHOPPING_BAG, routerLink:'/outlet/'+this.outlet?.id+'/orders/' },
      { label: 'Products', icon: PrimeIcons.BOOKMARK, routerLink:'/outlet/'+this.outlet?.id+'/products/' },
      { label: 'Inventory', icon: PrimeIcons.LIST, routerLink:'/outlet/'+this.outlet?.id+'/inventory/' },
      { label: 'Customers', icon: PrimeIcons.USER, routerLink:'/outlet/'+this.outlet?.id+'/customers/' },
      { label: 'Report', icon: PrimeIcons.CHART_PIE, routerLink:'/outlet/'+this.outlet?.id+'/report/' },
      { label: 'Settings', icon: PrimeIcons.COG, routerLink: '/outlet/'+this.outlet?.id+'/settings/'},
    ]
  }
}
