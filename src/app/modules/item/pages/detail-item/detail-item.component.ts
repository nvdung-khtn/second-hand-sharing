import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {
  isOpenModal = false;
  checkMessage = false;
  isOwner = true; // check nếu là người cho
  isApproved = -1;
  toggleApprove = 0;
  selectedUser = {};

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
      'https://cellphones.com.vn/sforum/wp-content/uploads/2020/04/LR-29-scaled.jpg',
      'https://cellphones.com.vn/sforum/wp-content/uploads/2020/04/LR-29-scaled.jpg',
      'https://cellphones.com.vn/sforum/wp-content/uploads/2020/04/LR-29-scaled.jpg',
      'https://cellphones.com.vn/sforum/wp-content/uploads/2020/04/LR-29-scaled.jpg',
      'https://cellphones.com.vn/sforum/wp-content/uploads/2020/04/LR-29-scaled.jpg',
      'https://cellphones.com.vn/sforum/wp-content/uploads/2020/04/LR-29-scaled.jpg',
      'https://cellphones.com.vn/sforum/wp-content/uploads/2020/04/LR-29-scaled.jpg',
    ],
    donateAccountName: 'Lê Mậu Toàn',
  };

  requestListData = [
    {
      id: 2,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 3,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 3,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 4,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 4,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 5,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 5,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 6,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 6,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 7,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 7,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 8,
      receiverName: 'Lê Trường Vĩ',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): // Đầu tiên check xem là người cho hay người nhận

  /*  Nếu là người xin nhận
        call api để check người dùng đã đkí nhận chưa
        nếu rồi thì đổi giá trị của checkMessage = true */

  /*  Nếu là người cho
        call api request user list
        check người dùng nào đang dc approve và thay đổi giá trị isApprove và thay đổi thông tin selected User*/
  void {}

  onClose = () => {
    this.router.navigateByUrl('/home');
  };

  onClickRegister = () => {
    this.isOpenModal = true;
  };
  onClickUnregister = () => {
    // call api huy dang ky
    this.checkMessage = false;
  };

  // flow người cho
  onClickApprove = (id: number) => {
    if (this.isApproved !== id) {
      this.toggleApprove = 0;
      // gọi api approve người dùng mới
    } else {
      this.toggleApprove++;
    }
    this.isApproved = id;
    if (this.toggleApprove === 1) {
      this.isApproved = -1;
      // gọi api hủy
    }
  };
}
