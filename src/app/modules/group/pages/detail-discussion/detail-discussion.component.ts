import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupClient } from 'src/app/core/api-clients/group.client';

@Component({
    selector: 'app-detail-discussion',
    templateUrl: './detail-discussion.component.html',
    styleUrls: ['./detail-discussion.component.scss'],
})
export class DetailDiscussionComponent implements OnInit {
    detailPost: any;
    groupId: number;
    myRole = '';
    myAvatar = '';

    constructor(private route: ActivatedRoute, private router: Router, private location: Location, private groupClient: GroupClient) {}

    ngOnInit(): void {
        // gọi api get detail group post. Nhớ handle nếu error thì chuyển nó sang page not found
        this.detailPost = {
            id: 1,
            itemName: 'test donate event 2 lan 2',
            imageUrl: [
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            ],
            content: 'Đây là content của tôi viết',
            postTime: '2021-07-03T14:40:25.990544',
            postByAccountName: 'Lê Trường Vĩ',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/3ece2764-dd47-480a-9be0-8b761050a3bb',
        };
        const user: any = JSON.parse(localStorage.getItem('userInfo'));
        this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
        this.getMyRole(this.groupId, user?.id);
        this.myAvatar = user?.avatarUrl;
    }

    getMyRole = (groupId: number, userId: number) => {
      this.groupClient.getRoleByUserId(groupId, userId).subscribe(
          (response) => {
              if (response.succeeded) {
                  this.myRole = response.message;
              }
          },
          (error) => {
            this.router.navigateByUrl(`/group/${this.groupId}`);
          }
      );
  }

    onClose = () => {
        const history: any = this.location.getState();
        if (history.navigationId > 1) {
            this.location.back();
        } else {
            this.router.navigateByUrl(`/home`);
        }
    }

    onSend = () => {
      console.log('call api send comment');
    }
}
