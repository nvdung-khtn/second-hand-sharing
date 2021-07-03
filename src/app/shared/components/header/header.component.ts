import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
// tslint:disable-next-line: no-unused-expression
import { faHands, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FirebaseClient } from 'src/app/core/api-clients/firebase.client';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../../service/notification.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    selectedTab = 1;
    selectedMoreTab = false;
    currentUser: UserInfo;
    notiTimes = 0;

    // subscribe noti variable
    subscriptionNoti: Subscription;

    headerContext = [
        {
            title: 'Trang chủ',
            type: 'mat-icon',
            icon: 'home',
            link: 'home',
            id: 1,
        },
        {
            title: 'Nhóm',
            icon: 'group',
            type: 'mat-icon',
            link: 'group',
            id: 2,
        },
        /* {
            title: 'Chiến dịch gây quỹ',
            icon: faHandsHelping,
            type: 'fas',
            link: 'campaign',
            id: 3,
        }, */
    ];

    otherContext = [
        {
            title: 'Vinh danh',
            icon: 'stars',
            id: 3,
        },
        {
            title: 'Messenger',
            icon: 'messages',
            id: 4,
        },
        {
            title: 'Thông báo',
            icon: 'notifications',
            id: 5,
        },
        {
            title: 'Đăng xuất',
            icon: 'exit_to_app',
            id: 6,
        },
    ];
    destroy$ = new Subject<void>();

    constructor(
        private router: Router,
        private authService: AuthService,
        private firebaseClient: FirebaseClient,
        private notificationService: NotificationService
    ) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            // tslint:disable-next-line: deprecation
            .subscribe(() => {
                this.selectedTab = this.checkTabURL(this.router?.url);
                if (this.selectedTab === 5) {
                    this.notiTimes = 0;
                    this.notificationService.changeMessage({})
                }
            });
    }
    ngOnInit(): void {
        this.getCurrentUser();

        this.subscriptionNoti = this.notificationService.currentNoti.subscribe((message: any) => {
            if (message?.type !== '1' && message?.type !== '3' && message?.type !== undefined) {
                this.notiTimes++;
            }
            if (this.selectedTab === 5) {
                this.notiTimes = 0;
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.subscriptionNoti.unsubscribe();
    }

    getCurrentUser() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => (this.currentUser = user));
    }

    isSelectedTab = (id: number) => {
        this.selectedTab = id;
    };
    checkTabURL = (url: string) => {
        const checkArray = ['home', 'group', 'chart', 'messages', 'notification'];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < checkArray.length; i++) {
            if (url.indexOf(checkArray[i]) !== -1) {
                return i + 1;
            }
        }
    };
    onLogOut = () => {
        const firebaseToken = localStorage.getItem('firebaseToken');
        this.firebaseClient.removeFirebase(firebaseToken).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => console.log(error)
        );
        localStorage.clear();
        this.router.navigateByUrl('/auth/login').then(() => {
            window.location.reload();
        });
    };

    getName = (name: string) => {
        const temp = name && name.split(' ');
        return Array.isArray(temp) && temp[temp?.length - 1];
    };

    onClickNotification = () => {
        this.notiTimes = 0;
    };
}
