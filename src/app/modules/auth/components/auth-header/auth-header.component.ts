import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss', '../../pages/forgot-password/forgot-password.component.scss', '../../pages/register/register.component.scss']
})
export class AuthHeaderComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}
  ngOnInit(): void {
  }

  navigation(str: string) {
    switch(str){
      case "register":
        this.router.navigateByUrl('/auth/register');
        break;
      case "login":
        this.router.navigateByUrl('/auth/login');
        break;
    }
  }

}
