import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  emailAddress!: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.emailAddress = this.route.snapshot.queryParamMap.get('emailAddress');
  }

}
