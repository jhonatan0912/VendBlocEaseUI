import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SideMenuItemComponent } from "../side-menu-item/side-menu-item.component";
import { ResponseDTO } from '../../models/response/response';
import { ProductCategory } from '../../models/product-category/product-category';
import { CreateOrder } from '../../models/order/order';
import { Inventory } from '../../models/inventory/inventory';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../data-access/services/order/order.service';
import { LoadingService } from '../../data-access/services/loading/loading.service';
import { LocalService } from '../../data-access/services/local/local.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryOptionComponent } from "../delivery-option/delivery-option.component";
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { Outlet } from '../../models/outlet/outlet';
import { UpdateProfile, User } from '../../models/user/user';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { Subject, first, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InventoryService } from '../../data-access/services/inventory/inventory.service';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  imports: [SideMenuItemComponent,
    CommonModule,
    CartItemComponent,
    FormsModule,
    ReactiveFormsModule,
    DeliveryOptionComponent, ButtonModule,
    CardModule,
    OverlayPanelModule]
})
export class OrderComponent {
  date = new Date();

  profileUpdateForm = new FormGroup({
    address: new FormControl(),
    phone: new FormControl(),
  })

  showModalCart: boolean = false;
  outletId: number = 0;
  outlet: Outlet | undefined = undefined;
  categories: ProductCategory[] = [];
  allproducts: Inventory[] = [];
  products: Inventory[] = [];
  cart: any[] = [];
  cartCount: number = 0;
  deliveryFee: number = 0;
  ordersCost: number = 0;
  totalcost: number = 0;
  canCheckOut: boolean = false;
  currentCategory = -1;
  selectedDeliveryMode: number = 1;
  delivery: boolean = true;
  updateProfileModal: boolean = false;
  serviceCharge: number = 70;
  user: User | null = null;
  currentOrder: number = 0;
  yen: number = 0;


  constructor(private toastr: ToastrService,
    private orderService: OrderService,
    private outletService: OutletService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private localStorage: LocalService,
    private router: Router,
    private authService: AuthService,
    private inventoryService: InventoryService) {
  }

  destroy$: Subject<void> = new Subject<void>();
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.outletId = params['id']
    });
   // this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe({
      this.authService.user$.pipe(first()).subscribe({
      next: (result) => {
        this.user = result as User
      },
      error: () => {
        console.log("Something went wrong");
      }
    });
    this.fetchOutlet(this.outletId);
    this.fetchCategories(this.outletId);
    this.fetchInventory(this.outletId);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  newOrder() {
    this.currentOrder++;
    this.toastr.info('New Order Started', 'New Order')
  }

  updateProfile() {
    const formValue = this.profileUpdateForm.value;
    const contactData: UpdateProfile = {
      phone: formValue.phone,
      address: formValue.address,
      email: this.user?.email as string
    };
    this.authService.updateContact(contactData).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.toastr.success('Profile updated successfully', 'Success');
          this.toggleProfileModal();
          const user: User = {
            email: this.user?.email as string,
            phone: contactData.phone as string,
            address: contactData.address as string,
            name: this.user?.name as string,
            id: this.user?.id as string
          };
          this.authService.setUser(user);
        }
      },
      error: () => {
        this.toastr.error("something went wrong");
      }
    })
  }

  public fetchOutlet(outlet: number) {
    this.outletService.getOutlet(outlet).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          console.log('outlet', result.data);
          this.outlet = result.data;
          if (this.delivery) {
            this.deliveryFee += this.outlet?.deliveryFee as number;
          }
        }
        else {
          console.log("something went wrong");
        }
      },
      error: () => {
        console.log("Something went wrong");
      }
    })
  }

  public fetchCategories(outlet: number) {
    this.orderService.getProductsCategories(outlet).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.categories = result.data;
        }
        else {
          console.log("something went wrong");
        }
      },
      error: () => {
        console.log("Something went wrong");
      }
    })
  }

  public fetchInventory(outlet: number) {
    this.inventoryService.getInventoryByOutlet(outlet).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.allproducts = result.data;
          this.categories = this.categories.map((c:ProductCategory) => ({...c, quantity:this.allproducts?.filter(x=>x.productCategoryId === c.id).length + ""}))
        }
        else {
          console.log("Unable to fetch inventory")
        }
      }
    })
  }

  validateAddressAndPhone(): boolean {
    if (!this.user?.phone) {
      return false;
    }
    return true;
  }

  deliveryModeChanged(delivery: boolean): void {
    const deliveryFeeChange = delivery ? (this.outlet?.deliveryFee as number) : -this.deliveryFee;
    this.totalcost += deliveryFeeChange;
    this.deliveryFee = delivery ? deliveryFeeChange : 0;
    this.selectedDeliveryMode = delivery ? 1 : 0;
    this.delivery = delivery;
  }

  categoryProducts(event: Event, productCategoryId: number) {
    event.preventDefault();
    this.currentCategory = productCategoryId;
    this.products = this.allproducts.filter(x => x.productCategoryId === productCategoryId);
  }

  addToCart(product: any) {
    const price = product.salesPrice * product.orderQuantity;
    product.price = price;
    this.ordersCost = this.ordersCost + (product.price);
    this.totalcost = this.ordersCost + this.deliveryFee + this.serviceCharge;
    if (this.currentOrder >= 0 && this.currentOrder < this.cart.length) {
      //Order cart exist in general cart
      const currentCart: Inventory[] = this.cart[this.currentOrder];
      const isProductInCurrentCart = currentCart.findIndex(x => x.productId === product.productId);
      if (isProductInCurrentCart < 0) {
        currentCart.push({ ...product, group:this.currentOrder+1 });
      }
      else {
        currentCart[isProductInCurrentCart].orderQuantity += product.orderQuantity;
        currentCart[isProductInCurrentCart].price += (product.price);
      }
    } else {
      // Is not in general cart 
      const orderCart: any[] = [];
      orderCart.push({ ...product, group:this.currentOrder+1 });
      this.cart.push(orderCart);
    }
    console.log(this.cart);
    product.orderQuantity = 1;
    this.toastr.success('Added To Cart', 'Success');
    this.cartCount++;
  }

  updateProductQuantity(productId: number, increment: boolean) {
    const index = this.products.findIndex(x => x.productId === productId);
    if (increment) {
      this.products[index].orderQuantity = this.products[index].orderQuantity + 1;
    }
    else {
      if (this.products[index].orderQuantity > 1) {
        this.products[index].orderQuantity = this.products[index].orderQuantity - 1;
      }
    }
  }

  removeFromCart(product: any, orderIndex:number) {
    this.cartCount--;
    this.ordersCost = this.ordersCost - product.price;
    this.totalcost = this.ordersCost + this.deliveryFee + this.serviceCharge;
    const currentCart: Inventory[] = this.cart[orderIndex];
    const itemIndex = currentCart.findIndex(x => x.productId === product.productId);
    if (itemIndex !== -1) {
      currentCart.splice(itemIndex, 1);
      if(currentCart.length < 1){
        this.cart.splice(orderIndex, 1);
      }
    }
  }

  showmodal() {
    this.showModalCart = !this.showModalCart;
    const mydialog = document.getElementById('dialog');
  }

  toggleProfileModal() {
    this.updateProfileModal = !this.updateProfileModal;
  }

  checkout() {
    const email = this.user?.email as string;
    if (!email) this.router.navigate(['login'])
    if (this.cartCount < 1) {
      this.toastr.warning("Add Items to cart Before Checking Out");
      return;
    }
    if (!this.validateAddressAndPhone()) {
      this.toastr.warning("Please update your phone and address");
      this.toggleProfileModal();
      return;
    }
    this.loadingService.isLoading.next(true);
    const order: CreateOrder = {
      orders: this.cart,
      outletId: this.outletId,
      customerEmail: email,
      amount: this.ordersCost + this.deliveryFee + this.serviceCharge,
      deliveryMode: this.selectedDeliveryMode,
      deliveryCost: this.deliveryFee,
      orderCost: this.ordersCost,
      serviceCharge: this.serviceCharge,
    };
    this.orderService.checkout(order).pipe(first()).subscribe({
      next: (result: ResponseDTO) => {
        if (result.status) {
          this.loadingService.isLoading.next(false);
          this.toastr.success('Trying to set up your payment link', 'Order Created')
          window.location.href = result.data;

        }
        else {
          this.toastr.error(result.message);
          this.loadingService.isLoading.next(false);
        }
      },
      error: (e) => {
        this.loadingService.isLoading.next(false);
      }
    })
  }

}
