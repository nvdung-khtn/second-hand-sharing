import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defaultSelectedCategory = 0;
  selectedCategory = 0; // follow selected category id to display data

  constructor() { }

  ngOnInit(): void {}

  onCategoryChange = (event: any) => {
    this.selectedCategory = event;
    console.log(this.selectedCategory);
  }
}
