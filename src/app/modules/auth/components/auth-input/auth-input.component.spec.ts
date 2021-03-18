import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInputComponent } from './auth-input.component';

describe('AuthInputComponent', () => {
  let component: AuthInputComponent;
  let fixture: ComponentFixture<AuthInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
