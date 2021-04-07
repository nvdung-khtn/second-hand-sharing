import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAlignJustify, faBoxes, faBriefcase, faChair, faHouseDamage, faRunning, faTshirt, faTv } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() categoryIconBackground = '';
  @Input() categoryBackground = '';
  @Input() selectedFromParent: number;
  @Output() categoryIDChange = new EventEmitter<number>(); // return of tab id

  selectedCategory = -1;
  categoryContext = [];
  // category get from api
  categoryData = [{
    categoryName: 'Quần áo',
    id: 1,
  },
  {
    categoryName: 'Đồ gia dụng',
    id: 2,
  },
  {
    categoryName: 'Học tập',
    id: 3,
  },
  {
    categoryName: 'Thể thao',
    id: 4,
  },
  {
    categoryName: 'Điện tử',
    id: 5,
  },
  {
    categoryName: 'Nội thất',
    id: 6,
  },
  {
    categoryName: 'Khác',
    id: 7,
  }];
  defaultContext = [{
    categoryName: 'Tất cả',
    id: 0,
  }];
  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    !this.selectedFromParent && (this.selectedCategory = this.selectedFromParent);
    this.categoryContext = [...this.defaultContext, ...this.categoryData];
    this.assignIcon(this.categoryContext);
  }

  // map icon
  assignIcon = (categoryArr) => {
    const iconList = [ faAlignJustify, faTshirt, faHouseDamage, faBriefcase, faRunning, faTv, faChair, faBoxes];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < categoryArr?.length; i++) {
      categoryArr[i].icon = iconList[i];
    }
  }

  onClick = (id: number) => {
    this.selectedCategory = id;
    this.categoryIDChange.emit(id);
  }

}
