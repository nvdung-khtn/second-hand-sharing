import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-home-left-side',
    templateUrl: './home-left-side.component.html',
    styleUrls: ['./home-left-side.component.scss'],
})
export class HomeLeftSideComponent implements OnInit {
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
    currentName: string;
    avatarUrl: string;
    selectedCategory = -1;

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            // tslint:disable-next-line: deprecation
            .subscribe(() => {
                this.selectedCategory = this.checkTabURL(this.router?.url);
            });
    }

    ngOnInit(): void {
        this.getCurrentName();
    }

    getCurrentName = () => {
        this.currentName = JSON.parse(localStorage.getItem('userInfo')).fullName;
        this.avatarUrl = JSON.parse(localStorage.getItem('userInfo')).avatarUrl;
    }

    checkTabURL = (url: string) => {
        const checkArray = ['my-registration', 'my-donations'];
        for (let i = 0; i < checkArray.length; i++) {
            if (url.indexOf(checkArray[i]) !== -1) {
                return i + 1;
            }
        }
    }

    onClick = (id: number) => {
        this.selectedCategory = id;
    }
}
