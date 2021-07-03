import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AddressService } from './shared/service/address.service';
import { AuthService } from './shared/service/auth.service';
import { MessagingService } from './shared/service/message.service';
import { NotificationService } from './shared/service/notification.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'second-hand-sharing';
    isLogin = false;
    openMessageBox = false;
    messageBoxByUser;
    message;
    changeMessage = false;
    newMessage;

    constructor(
        private router: Router,
        private authService: AuthService,
        private addressService: AddressService,
        private messagingService: MessagingService,
        private notificationService: NotificationService
    ) {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                this.checkLogin();
            }
        });
    }

    checkLogin = () => {
        if (this.authService.isAuthenticated()) {
            this.isLogin = true;
        }
    };

    // tslint:disable: use-lifecycle-interface
    // tslint:disable-next-line: typedef
    ngOnInit() {
        this.checkLogin();
        this.messagingService.receiveMessage().subscribe((payload) => {
            this.changeMessage = true;
            this.newMessage = JSON.parse(payload.data.message)
            this.notificationService.changeMessage(payload.data)
        });
        this.message = this.messagingService.currentMessage;
    }
}
