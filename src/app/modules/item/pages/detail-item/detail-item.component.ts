import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {
  isOpenModal = false;

  data = {
    id: 9,
    itemName: 'áo khoác cũ test 3',
    receiveAddress: {
      street: '225 Nguyễn Văn Cừ',
      wardId: 1,
      districtId: 1,
      cityId: 1,
    },
    postTime: '2021-04-12T07:08:10.614975',
    description: 'áo khoác cũ nhưng mới nhưng mà cũ',
    imageUrl: [
      'https://storage.googleapis.com/twohandsharing.appspot.com/9533e7fe-32ec-4647-aeaf-c22049d873a5',
      'https://storage.googleapis.com/twohandsharing.appspot.com/58e81e5a-bb3b-4271-8db7-e93a53d98da4',
      'https://storage.googleapis.com/twohandsharing.appspot.com/3f6d3c76-5791-4979-9998-7bfb20b53ebc',
      'https://storage.googleapis.com/twohandsharing.appspot.com/f9dc1e9c-40a1-401e-9d88-4b7f88f13a7b',
      'https://storage.googleapis.com/twohandsharing.appspot.com/402f066c-5c68-4e0a-96f0-84d50ea5905c',
      'https://storage.googleapis.com/twohandsharing.appspot.com/6ca12c3d-1e69-443e-bead-5757a7f79da8',
    ],
    donateAccountName: 'Lê Mậu Toàn',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClose = () => {
    this.router.navigateByUrl('/home')
  }

  onClickBtn = () => {
    this.isOpenModal = true;
  }
}

