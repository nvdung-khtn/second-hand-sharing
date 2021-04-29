import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faAlignJustify,
  faBoxes,
  faBriefcase,
  faChair,
  faHouseDamage,
  faRunning,
  faTshirt,
  faTv,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryClient } from 'src/app/core/api-clients/category.client';
import { Category } from 'src/app/core/constants/category.constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() categoryIconBackground = '';
  @Input() categoryBackground = '';
  @Input() selectedFromParent: number;
  @Output() categoryIDChange = new EventEmitter<number>(); // return of tab id

  selectedCategory = -1;
  categoryContext = [];
  // category get from api
  categories: Category[];

  defaultContext = [
    {
      categoryName: 'Tất cả',
      id: 0,
    },
  ];
  constructor(private categoryClient: CategoryClient) {}

  async ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    await this.getCategories();

    // !this.selectedFromParent &&
    //   (this.selectedCategory = this.selectedFromParent);
    // this.categoryContext = [...this.defaultContext, ...this.categories];
    // this.assignIcon(this.categoryContext);
  }

  // map icon
  assignIcon = (categoryArr) => {
    const iconList = [
      faAlignJustify,
      faTshirt,
      faHouseDamage,
      faBriefcase,
      faRunning,
      faTv,
      faChair,
      faBoxes,
    ];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < categoryArr?.length; i++) {
      categoryArr[i].icon = iconList[i];
    }
  };

  onClick = (id: number) => {
    this.selectedCategory = id;
    this.categoryIDChange.emit(id);
  };

  getCategories() {
    this.categoryClient.getCategories().subscribe(
      (categories) => {
        this.categories = categories;

        !this.selectedFromParent &&
          (this.selectedCategory = this.selectedFromParent);
        this.categoryContext = [...this.defaultContext, ...this.categories];
        this.assignIcon(this.categoryContext);
      },
      (error) => console.log(error)
    );
  }

}
