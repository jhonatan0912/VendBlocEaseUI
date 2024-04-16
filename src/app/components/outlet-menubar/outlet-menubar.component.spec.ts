import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletMenubarComponent } from './outlet-menubar.component';

describe('OutletMenubarComponent', () => {
  let component: OutletMenubarComponent;
  let fixture: ComponentFixture<OutletMenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletMenubarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutletMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
