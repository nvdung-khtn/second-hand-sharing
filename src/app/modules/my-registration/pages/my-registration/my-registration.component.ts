import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-registration',
    templateUrl: './my-registration.component.html',
    styleUrls: ['./my-registration.component.scss'],
})
export class MyRegistrationComponent implements OnInit {
    myRegistrationData = [
        {
            id: 72,
            itemName: 'Bàn phím xịn',
            address: {
                street: '67 Dã Tượng',
                wardId: 27403,
                districtId: 776,
                cityId: 79,
            },
            postTime: '2021-06-11T10:06:51.868377',
            description: 'Bàn phím ngon',
            imageUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/b2bad676-a2ff-4ba9-b1a0-9a136abcfb91',
            donateAccountName: 'Hữu Dũng',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/36bfd2b9-f8de-42e5-8025-797b1f9f2763',
        },
        {
            id: 71,
            itemName: 'bàn phím cũ',
            address: {
                street: '67 Dã Tượng',
                wardId: 27403,
                districtId: 776,
                cityId: 79,
            },
            postTime: '2021-06-11T10:05:01.760705',
            description: 'Cũ nhưng mới',
            imageUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/70b677f9-decc-4cdc-8e42-9a4d6d39561c',
            donateAccountName: 'Hữu Dũng',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/36bfd2b9-f8de-42e5-8025-797b1f9f2763',
        },
        {
            id: 70,
            itemName: 'Bàn phím',
            address: {
                street: '67 Dã Tượng',
                wardId: 27403,
                districtId: 776,
                cityId: 79,
            },
            postTime: '2021-06-11T05:30:29.664773',
            description: 'Cho bàn phím còn mới',
            imageUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/0385cca2-8e78-419e-972a-45a198ca305a',
            donateAccountName: 'Hữu Dũng',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/36bfd2b9-f8de-42e5-8025-797b1f9f2763',
        },
        {
            id: 65,
            itemName: 'Lê Trường Vĩ Test',
            address: {
                street: '132',
                wardId: 715,
                districtId: 26,
                cityId: 2,
            },
            postTime: '2021-06-02T15:21:10.408282',
            description: 'Lê Trường Vĩ Test',
            imageUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/fd8e09d9-a541-403f-bbce-52a77d5ed4d7',
            donateAccountName: 'Lê Trường Vĩ',
            avatarUrl: null,
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
