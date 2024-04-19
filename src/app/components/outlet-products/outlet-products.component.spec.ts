import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletProductsComponent } from './outlet-products.component';

describe('OutletProductsComponent', () => {
  let component: OutletProductsComponent;
  let fixture: ComponentFixture<OutletProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutletProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
