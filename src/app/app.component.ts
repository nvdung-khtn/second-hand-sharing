import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'second-hand-sharing';
  isLogin = false;
  constructor(private router: Router) {
      this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
           this.checkLogin();
          }
      });
  }

  checkLogin = () => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
        this.isLogin = true;
    } else {
        this.isLogin = false;
    }
  }

  ngOnIt(): void {}


}
