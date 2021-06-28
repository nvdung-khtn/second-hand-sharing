import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-group',
  templateUrl: './about-group.component.html',
  styleUrls: ['./about-group.component.scss']
})
export class AboutGroupComponent implements OnInit {
  @Input() groupDetail: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.groupDetail)
  }

}
