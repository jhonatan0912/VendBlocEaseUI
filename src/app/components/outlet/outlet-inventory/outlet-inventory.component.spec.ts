import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletInventoryComponent } from './outlet-inventory.component';

describe('OutletInventoryComponent', () => {
  let component: OutletInventoryComponent;
  let fixture: ComponentFixture<OutletInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutletInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
