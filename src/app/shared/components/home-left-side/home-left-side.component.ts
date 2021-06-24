import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-home-left-side',
    templateUrl: './home-left-side.component.html',
    styleUrls: ['./home-left-side.component.scss'],
})
export class HomeLeftSideComponent implements OnInit, OnDestroy {
    categoryContext = [
        {
            id: 1,
            title: 'Đã đăng ký nhận',
            icon: 'bookmark',
            type: 'mat-icon',
            url: '/my-registration',
        },
        {
            id: 2,
            title: 'Bài đã đăng',
            icon: 'card_giftcard',
            type: 'mat-icon',
            url: '/my-donations',
        },
    ];

    shortcutData = [
        {
            name: 'Quyên góp sách vở quần áo cũ',
            image: 'assets/image/default-avatar.png',
        },
    ];
    currentUser: UserInfo;
    selectedCategory = -1;
    destroy$ = new Subject<void>();

    constructor(private router: Router, private authService: AuthService) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            // tslint:disable-next-line: deprecation
            .subscribe(() => {
                this.selectedCategory = this.checkTabURL(this.router?.url);
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

    checkTabURL = (url: string) => {
        const checkArray = ['my-registration', 'my-donations'];
        for (let i = 0; i < checkArray.length; i++) {
            if (url.indexOf(checkArray[i]) !== -1) {
                return i + 1;
            }
        }
    };

    onClick = (id: number) => {
        this.selectedCategory = id;
    };

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
