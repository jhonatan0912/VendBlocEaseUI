import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletReportComponent } from './outlet-report.component';

describe('OutletReportComponent', () => {
  let component: OutletReportComponent;
  let fixture: ComponentFixture<OutletReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutletReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
