import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss']
})
export class AuthInputComponent implements OnInit {
  @Input() placeholderValue;
  @Input() type;
  @Input() dataType = "text";
  Inputvalue:string;
  @Output() completedInput = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  sendInput() {
    const data = {
      value: this.Inputvalue,
      type: this.type
    };

    this.completedInput.emit(data);
  }
}
