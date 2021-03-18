import { componentFactoryName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: './auth-forgot-password.component.html',
  styleUrls: ['./auth-forgot-password.component.scss']
})
export class AuthForgotPasswordComponent implements OnInit {
  emailValue: string = "";
  displayError = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  onSubmit(email) {
    this.isValidEmail(email) && this.router.navigate(['/auth/forgot-password/otp-verification'], {relativeTo: this.route ,queryParams: {'emailAddress': this.emailValue}, queryParamsHandling: 'merge'});
    !this.isValidEmail(email) && (this.displayError = true)
  }



}
