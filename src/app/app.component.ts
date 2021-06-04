import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AddressService } from './shared/service/address.service';
import { AuthService } from './shared/service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'second-hand-sharing';
    isLogin = false;
    constructor(
        private router: Router,
        private authService: AuthService,
        private addressService: AddressService
    ) {
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

    async ngOnInit() {
        this.checkLogin();
        await this.addressService.loadData();
    }
}
