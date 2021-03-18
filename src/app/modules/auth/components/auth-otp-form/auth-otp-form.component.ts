import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-otp-form',
  templateUrl: './auth-otp-form.component.html',
  styleUrls: ['./auth-otp-form.component.scss']
})
export class AuthOtpFormComponent implements OnInit {
  @Input() emailAddress!: string;

  constructor(
    private router: Router,
  ) {}
  ngOnInit(): void {
  }

  navigation(str: string) {
    switch(str){
      case "another-email":
        this.router.navigateByUrl('/auth/forgot-password');
        break;
    }
  }
}
