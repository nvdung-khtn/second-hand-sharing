import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  @Input() handleCloseParent;
  @Input() openMessageModal = false;
  @Input() isSuccessButton = true;
  @Input() message = '';
  @Output() modalChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick = () => {
    this.openMessageModal = false;
    this.handleCloseParent = false;
    this.modalChange.emit(this.handleCloseParent);
  }
}
