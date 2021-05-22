import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-left-side',
  templateUrl: './home-left-side.component.html',
  styleUrls: ['./home-left-side.component.scss']
})
export class HomeLeftSideComponent implements OnInit {
  categoryContext = [
    {
      title: 'Nhóm',
      icon: 'group',
      type: 'mat-icon',
    },
    {
      title: 'Đã đăng ký nhận',
      icon : 'bookmark',
      type: 'mat-icon',
    }
  ];

  shortcutData = [
    {
      name: 'Quyên góp sách vở quần áo cũ',
      image: 'assets/image/default-avatar.png',
    }
  ];
  currentName: string;
  constructor() { }

  ngOnInit(): void {
    this.getCurrentName();
  }

  getCurrentName() {
    this.currentName = JSON.parse(localStorage.getItem('userInfo')).fullName;
  }
}
