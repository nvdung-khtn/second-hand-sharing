import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isError = false;

  constructor(private router: Router, private authService: AuthService) {}

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
    this.authService.login(loginData).subscribe(
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
