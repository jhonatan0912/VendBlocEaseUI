import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOptionComponent } from './delivery-option.component';

describe('DeliveryOptionComponent', () => {
  let component: DeliveryOptionComponent;
  let fixture: ComponentFixture<DeliveryOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
