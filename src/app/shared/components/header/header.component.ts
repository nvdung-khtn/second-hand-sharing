import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
// tslint:disable-next-line: no-unused-expression
import { faHands, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FirebaseClient } from 'src/app/core/api-clients/firebase.client';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AuthService } from '../../service/auth.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    selectedTab = 1;
    selectedMoreTab = false;
    currentUser: UserInfo;

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
        {
            title: 'Chiến dịch gây quỹ',
            icon: faHandsHelping,
            type: 'fas',
            link: 'campaign',
            id: 3,
        },
    ];

    otherContext = [
        {
            title: 'Vinh danh',
            icon: 'stars',
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

    constructor(private router: Router, private authService: AuthService, private firebaseClient: FirebaseClient) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            // tslint:disable-next-line: deprecation
            .subscribe(() => {
                this.selectedTab = this.checkTabURL(this.router?.url);
            });
    }
    ngOnInit(): void {
        this.getCurrentUser();
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
        const checkArray = ['home', 'group', 'campaign', 'chart', 'notification'];
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

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
