import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-form',
  templateUrl: './dropdown-form.component.html',
  styleUrls: ['./dropdown-form.component.scss']
})
export class DropdownFormComponent implements OnInit {
  @Input() inputData;
  @Input() property;
  @Input() dropdownLabel;
  @Output() selectedIndex = new EventEmitter<number>();
  @Output() selectedValue = new EventEmitter<any>();

  selected: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect = () => {
    this.selectedValue.emit(this.selected);
    const index = this.inputData.findIndex(item => item[this.property] === this.selected);
    this.selectedIndex.emit(index);
  }

}
