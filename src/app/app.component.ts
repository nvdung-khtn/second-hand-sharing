import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'second-hand-sharing';
  isLogin = false;
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.checkLogin();
      }
    });
  }

  checkLogin() {
    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
    this.checkLogin();
  }
}
