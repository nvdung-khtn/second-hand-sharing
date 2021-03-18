import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      case "forgot":
        this.router.navigateByUrl('/auth/forgot-password');
        break;
    }
  }

}
