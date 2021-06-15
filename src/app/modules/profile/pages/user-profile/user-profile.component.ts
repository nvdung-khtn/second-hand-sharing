import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss', '../../../../../styles/_box.scss'],
})
export class UserProfileComponent implements OnInit {
    userId;
    profileData = {
        id: 3,
        fullName: 'Lê Trường Vĩ',
        dob: '2021-05-02T17:00:00',
        phoneNumber: '904576164',
        avatarUrl: 'https://storage.googleapis.com/secondhandsharing.appspot.com/560ab35d-0254-4f1a-8555-6fbd5a946e01',
        address: {
            street: '147',
            wardId: 25423,
            districtId: 696,
            cityId: 70,
        },
        email: 'nhocpeter1999@gmail.com',
    };

    constructor(private location: Location, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id');
    }

    onClose = () => {
        this.location.back();
    }
}
