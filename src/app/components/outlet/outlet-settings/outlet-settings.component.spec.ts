import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletSettingsComponent } from './outlet-settings.component';

describe('OutletSettingsComponent', () => {
  let component: OutletSettingsComponent;
  let fixture: ComponentFixture<OutletSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutletSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
