import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  // truoc khi navigate toi page nay thi` can su dung api confirm email nha

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick = () => {
    this.router.navigateByUrl('/auth/login');
  }

}
