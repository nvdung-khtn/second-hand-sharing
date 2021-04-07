import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss']
})
export class AddressModalComponent implements OnInit {
  @Input() isOpenModal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();
  @Output() addressData = new EventEmitter<any>();

  constructor() { }

  sendData = {
    province: {
      id: -1,
      name: '',
    },
    district: {
      id: -1,
      name: '',
    },
    ward: {
      id: -1,
      name: '',
    },
    street: '',
  };

  provinceData = [
    {
      Type: 1,
      SolrID: '/tien-giang',
      ID: 1,
      Title: 'Tiền Giang',
      STT: 0,
      Created: null,
      Updated: null,
      TotalDoanhNghiep: 10614
    },
    {
      Type: 1,
      SolrID: '/hung-yen',
      ID: 2,
      Title: 'Hưng Yên',
      STT: 0,
      Created: null,
      Updated: null,
      TotalDoanhNghiep: 11905
    },
    {
      Type: 1,
      SolrID: '/ha-noi',
      ID: 3,
      Title: 'Hà Nội',
      STT: 0,
      Created: null,
      Updated: null,
      TotalDoanhNghiep: 273457
    },
    {
      Type: 1,
      SolrID: '/tp-ho-chi-minh',
      ID: 4,
      Title: 'TP Hồ Chí Minh',
      STT: 0,
      Created: null,
      Updated: null,
      TotalDoanhNghiep: 453459
    },
  ];
  /*https://thongtindoanhnghiep.co/api/city/{{id_province}}/district*/
  districtData = [
    {
        Type: 2,
        SolrID: '/tp-ho-chi-minh/quan-1',
        ID: 9,
        Title: 'Quận 1',
        STT: 0,
        TinhThanhID: 4,
        TinhThanhTitle: 'TP Hồ Chí Minh',
        TinhThanhTitleAscii: '/tp-ho-chi-minh',
        Created: null,
        Updated: null
    },
    {
        Type: 2,
        SolrID: '/tp-ho-chi-minh/quan-10',
        ID: 15,
        Title: 'Quận 10',
        STT: 0,
        TinhThanhID: 4,
        TinhThanhTitle: 'TP Hồ Chí Minh',
        TinhThanhTitleAscii: '/tp-ho-chi-minh',
        Created: null,
        Updated: null
    },
    {
        Type: 2,
        SolrID: '/tp-ho-chi-minh/quan-11',
        ID: 14,
        Title: 'Quận 11',
        STT: 0,
        TinhThanhID: 4,
        TinhThanhTitle: 'TP Hồ Chí Minh',
        TinhThanhTitleAscii: '/tp-ho-chi-minh',
        Created: null,
        Updated: null
    },
  ];
  /* https://thongtindoanhnghiep.co/api/district/{{id_district}}/ward */
  wardData = [
    {
        Type: 3,
        SolrID: '/tp-ho-chi-minh/quan-1/phuong-01',
        ID: 5341,
        Title: 'Phường 01',
        STT: 0,
        TinhThanhID: 4,
        TinhThanhTitle: 'TP Hồ Chí Minh',
        TinhThanhTitleAscii: '/tp-ho-chi-minh',
        QuanHuyenID: 9,
        QuanHuyenTitle: 'Quận 1',
        QuanHuyenTitleAscii: '/tp-ho-chi-minh/quan-1',
        Created: null,
        Updated: null
    },
    {
        Type: 3,
        SolrID: '/tp-ho-chi-minh/quan-1/phuong-04-29-le-duan',
        ID: 16618,
        Title: 'Phường 04 29 Lê Duẩn',
        STT: 0,
        TinhThanhID: 4,
        TinhThanhTitle: 'TP Hồ Chí Minh',
        TinhThanhTitleAscii: '/tp-ho-chi-minh',
        QuanHuyenID: 9,
        QuanHuyenTitle: 'Quận 1',
        QuanHuyenTitleAscii: '/tp-ho-chi-minh/quan-1',
        Created: null,
        Updated: null
    },
    {
        Type: 3,
        SolrID: '/tp-ho-chi-minh/quan-1/phuong-06',
        ID: 12727,
        Title: 'Phường 06',
        STT: 0,
        TinhThanhID: 4,
        TinhThanhTitle: 'TP Hồ Chí Minh',
        TinhThanhTitleAscii: '/tp-ho-chi-minh',
        QuanHuyenID: 9,
        QuanHuyenTitle: 'Quận 1',
        QuanHuyenTitleAscii: '/tp-ho-chi-minh/quan-1',
        Created: null,
        Updated: null
    },
  ];
  displayError = false;

  ngOnInit(): void {
  }

  onClose = () => {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  }

  onSubmit = () => {
    if (this.sendData.province.id !== -1 && this.sendData.district.id !== -1 && this.sendData.ward.id !== -1 && this.sendData.street) {
      this.isOpenModal = false;
      this.displayError = false;
      this.addressData.emit(this.sendData);
      this.modalChange.emit(this.isOpenModal);
    }
    else {
      this.displayError = true;
    }
  }
}
