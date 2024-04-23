import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCustomersComponent } from './outlet-customers.component';

describe('OutletCustomersComponent', () => {
  let component: OutletCustomersComponent;
  let fixture: ComponentFixture<OutletCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutletCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
