import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-event',
  templateUrl: './about-event.component.html',
  styleUrls: ['./about-event.component.scss']
})
export class AboutEventComponent implements OnInit {

  @Input() eventDetail: any;

  hostedGroup: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.eventDetail)
    this.getGroupById(this.eventDetail?.groupId)
  }


    // lấy thông tin group host sự kiện
    getGroupById = (groupId: number) => {
      this.hostedGroup = {
          id: 1,
          groupName: 'test 2',
          description: 'string',
          createDate: '2021-05-20T15:02:03.842292',
          rules: '12',
          avatarUrl:
              'https://storage.googleapis.com/secondhandsharing.appspot.com/4ad9e526-64d9-4942-a8ff-8aa2ac12d1a9',
      };
  };


}
