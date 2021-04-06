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
      title: 'Đã lưu',
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
  constructor() { }

  ngOnInit(): void {
  }

}
