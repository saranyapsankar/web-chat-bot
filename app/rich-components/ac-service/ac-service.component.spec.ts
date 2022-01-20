import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcServiceComponent } from './ac-service.component';

describe('AcServiceComponent', () => {
  let component: AcServiceComponent;
  let fixture: ComponentFixture<AcServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
