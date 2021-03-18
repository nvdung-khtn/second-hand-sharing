import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOtpFormComponent } from './auth-otp-form.component';

describe('AuthOtpFormComponent', () => {
  let component: AuthOtpFormComponent;
  let fixture: ComponentFixture<AuthOtpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthOtpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOtpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
