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
  @Input() disableAllCate = false;
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

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    // !this.selectedFromParent &&
    //   (this.selectedCategory = this.selectedFromParent);
    // this.categoryContext = [...this.defaultContext, ...this.categories];
    // this.assignIcon(this.categoryContext);
    await this.getCategories();
  }

  // map icon
  assignIcon = (categoryArr) => {
    const iconList = !this.disableAllCate
      ? [
          faAlignJustify,
          faTshirt,
          faHouseDamage,
          faBriefcase,
          faRunning,
          faTv,
          faChair,
          faBoxes,
        ]
      : [
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
  }

  onClick = (id: number) => {
    this.selectedCategory = id;
    this.categoryIDChange.emit(id);
  }

  getCategories = () => {
    this.categoryClient.getCategories().subscribe(
      (categories) => {
        this.categories = categories;

        // tslint:disable-next-line: no-unused-expression
        !this.selectedFromParent &&
          (this.selectedCategory = this.selectedFromParent);
        this.categoryContext = !this.disableAllCate
          ? [...this.defaultContext, ...this.categories]
          : this.categories;
        this.assignIcon(this.categoryContext);
      },
      (error) => console.log(error)
    );
  }
}
