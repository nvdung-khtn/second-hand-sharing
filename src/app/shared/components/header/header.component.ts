import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
// tslint:disable-next-line: no-unused-expression
import { faHands, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedTab = 1;
  selectedMoreTab = false;

  headerContext = [{
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
      title: 'Giúp đỡ',
      icon : faHandsHelping,
      type: 'fas',
      id: 3,
    },
    {
      title: 'Chiến dịch gây quỹ',
      icon: faHands,
      type: 'fas',
      id: 4,
  }];

  otherContext = [
    {
      title: 'Thông báo',
      icon : 'notifications',
      id: 5,
    },
    {
      title: 'Thêm',
      icon : 'menu',
      id: 6,
    },
  ];

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        // tslint:disable-next-line: deprecation
        .subscribe(() => {
            this.selectedTab = this.checkTabURL(this.router?.url)
    });
  }
  ngOnInit(): void {
  }

  isSelectedTab = (id: number) => {
    this.selectedTab = id;
  }
  checkTabURL = (url: string) => {
    const checkArray = ['home', 'group', 'help', 'stars', 'notification'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < checkArray.length; i++) {
      if ( url.indexOf(checkArray[i]) !== -1 ) {
        return (i + 1);
      }
    }
  }


}