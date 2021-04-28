import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {

  data= {
    id: 9,
    itemName: "áo khoác cũ test 3",
    receiveAddress: {
      street: "225 Nguyễn Văn Cừ",
      wardId: 1,
      districtId: 1,
      cityId: 1
    },
    postTime: "2021-04-12T07:08:10.614975",
    description: "áo khoác cũ nhưng mới nhưng mà cũ",
    imageUrl: [
      "https://bloximages.chicago2.vip.townnews.com/wvnews.com/content/tncms/assets/v3/editorial/0/87/087b8129-c3fe-5ac7-8bcc-3fc1fd062231/5f57ca630b697.image.jpg"
    ],
    donateAccountName: "Lê Mậu Toàn"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
