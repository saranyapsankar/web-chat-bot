import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorStepperComponent } from './hor-stepper.component';

describe('HorStepperComponent', () => {
  let component: HorStepperComponent;
  let fixture: ComponentFixture<HorStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
