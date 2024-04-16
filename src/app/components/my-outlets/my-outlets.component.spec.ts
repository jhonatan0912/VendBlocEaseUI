import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOutletsComponent } from './my-outlets.component';

describe('MyOutletsComponent', () => {
  let component: MyOutletsComponent;
  let fixture: ComponentFixture<MyOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOutletsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
