import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss']
})
export class AuthInputComponent implements OnInit {
  @Input() valueInput = "abc";
  constructor() { }

  ngOnInit(): void {
  }

}
