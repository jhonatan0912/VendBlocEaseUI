import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebulaSampleComponent } from './nebula-sample.component';

describe('NebulaSampleComponent', () => {
  let component: NebulaSampleComponent;
  let fixture: ComponentFixture<NebulaSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NebulaSampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NebulaSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
