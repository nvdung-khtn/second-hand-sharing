import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authClient: AuthClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

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
    this.authClient.login(this.loginForm.value).subscribe(
      response => {
        console.log('data: ', response);
        this.isError = false;
        localStorage.setItem('access_token', response.data.jwToken);
        localStorage.setItem('expiration', response.data.expiration.toString());
        this.router.navigate(['/home']);
      },
      (err) => {
        this.isError = true;
        console.log(err);
        // Ném Error ra interceptor handling error.
      }
    );
  }
}
