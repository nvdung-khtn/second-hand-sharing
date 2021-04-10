import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isError = false;

  constructor(private router: Router, private authClient: AuthClient) {}

  ngOnInit(): void {}

  navigation(str: string) {
    switch (str) {
      case 'register':
        this.router.navigateByUrl('/auth/register');
        break;
      case 'forgot':
        this.router.navigateByUrl('/auth/forgot-password');
        break;
    }
  }

  onSubmit() {
    console.log(this.email);
    const loginData = {
      email: this.email,
      password: this.password,
    };
    this.authClient.login(loginData).subscribe(
      (data: any) => {
        this.isError = false;
        localStorage.setItem('currentUser', JSON.stringify(data?.data));
        this.router.navigateByUrl('/home');
      },
      (err) => {
        /* this.onLoginFail(); */
        this.isError = true;
        console.log(err);
      }
    );
  }
}
