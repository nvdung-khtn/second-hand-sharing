import { Component, OnInit } from '@angular/core';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { UserAward } from 'src/app/core/constants/user.constant';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
    topUserData: UserAward[];
    loading: boolean = false;

    constructor(private authClient: AuthClient) {}

    ngOnInit(): void {
        this.loading = true;
        this.authClient.getTopAward().subscribe(
            (response) => {
                this.topUserData = response.data;
                this.loading = false;
            },
            (error) => console.log(error)
        );
    }
}
