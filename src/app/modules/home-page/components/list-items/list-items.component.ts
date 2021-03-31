import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  listItems = {
    pageNumber: 1,
    pageSize: 12,
    data: [
      {
          id: 6,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-03-27T17:09:53.985371',
          description: 'test post test post test post test post test post test post test post test post test post test post test post test post test post test post test post asdsad',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 9,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-05T10:15:20.852918',
          description: 'test post',
          imageUrl: 'https://bloximages.chicago2.vip.townnews.com/wvnews.com/content/tncms/assets/v3/editorial/0/87/087b8129-c3fe-5ac7-8bcc-3fc1fd062231/5f57ca630b697.image.jpg'
      },
      {
          id: 10,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-05T12:19:29.924652',
          description: 'test post',
          imageUrl: 'https://bloximages.chicago2.vip.townnews.com/napavalleyregister.com/content/tncms/assets/v3/editorial/6/db/6db8a533-c7b3-5f67-b9bd-6faaba9c9d07/5f7cecdf4fa1b.image.jpg?resize=500%2C667'
      },
      {
          id: 11,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-05T13:03:09.65259',
          description: 'test post',
          imageUrl: 'https://1.bp.blogspot.com/-GkR2uBbsA68/WPeFP-r_gYI/AAAAAAAAB8M/xJTusOHoVTse2rmDZlNZJHbupl1Y1YwEgCLcB/s1600/spring-clothing-giveaway-winnipeg.jpg'
      },
      {
          id: 12,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-05T13:05:09.041008',
          description: 'test post',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 13,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-02T08:21:38.969712',
          description: 'test post',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 14,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-02T15:05:28.188235',
          description: 'test post',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 15,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-02T15:06:43.594898',
          description: 'test post',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 16,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-02T15:06:51.433767',
          description: 'test post',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 17,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-02T22:31:25.658344',
          description: 'test post',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 18,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-02T22:32:49.237103',
          description: 'test post',
          imageUrl: 'https://storage.googleapis.com/twohandsharing.appspot.com/46b5cb6a-5820-40db-9492-06f16bcc7e6c'
      },
      {
          id: 19,
          itemName: 'áo quần test post',
          receiveAddress: '123 Nguyễn Văn Cừ',
          postTime: '2021-04-02T22:36:27.421883',
          description: 'test post',
          imageUrl: '',
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
      console.log(new Date())
  }

  checkImage = (url: string) => {
      return (url ? url : 'assets/image/default-image.png');
  }

  subtractDate = (date: string) => {
    const endDate = new Date();
    const startDate = new Date(date);
    const diff = endDate.getTime() - startDate.getTime();
    const years = Math.floor(diff / (60 * 60 * 24 * 1000 * 365));
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    if (years > 0) {
        return (years + ' năm trước')
    }
    if (days > 0) {
        return (days + ' ngày trước')
    }
    if (hours > 0) {
        return (hours + ' giờ trước')
    }
    if (minutes > 0) {
        return (minutes + ' phút trước')
    }
    if (seconds > 0) {
        return (seconds + ' giây trước')
    }
  }
}
