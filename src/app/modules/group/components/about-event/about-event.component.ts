import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-event',
  templateUrl: './about-event.component.html',
  styleUrls: ['./about-event.component.scss']
})
export class AboutEventComponent implements OnInit {

  @Input() eventDetail: any;
  
  constructor() { }

  ngOnInit(): void {
  };


}
