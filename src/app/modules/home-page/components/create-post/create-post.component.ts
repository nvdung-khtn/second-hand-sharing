import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  isOpenModal = false;
  avatarUrl = '';

  constructor() { }

  ngOnInit(): void {
    const user: any = JSON.parse(localStorage.getItem('userInfo'));
    this.avatarUrl = user?.avatarUrl;
  }

  onClick = () => {
    this.isOpenModal = true;
  }

}
