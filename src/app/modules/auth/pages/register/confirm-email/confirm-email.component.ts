import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { ConfirmEmailRequest } from 'src/app/core/constants/auth.constant';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
    // truoc khi navigate toi page nay thi` can su dung api confirm email nha
    userId: string;
    code: string;
    message: string;

    constructor(private router: Router, private route: ActivatedRoute, private authClient: AuthClient) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.userId = params?.userid;
            this.code = params?.code;
        });
        if (this.userId && this.code) {
          const form: ConfirmEmailRequest = {
            userId: this.userId,
            code: this.code,
          }
          this.authClient.confirmEmail(form).subscribe(
            (response) => {
              console.log(response);
              this.message = 'Xác nhận email thành công, vui lòng đăng nhập để bắt đầu sử dụng hệ thống';
            },
            (error) => {
              console.log(error)
              this.message = error.error.Message;
            }
        );
      }

    }

    onClick = () => {
        this.router.navigateByUrl('/auth/login');
    };
}
