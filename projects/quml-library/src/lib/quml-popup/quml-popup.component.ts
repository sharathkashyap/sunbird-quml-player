import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quml-quml-popup',
  templateUrl: './quml-popup.component.html',
  styleUrls: ['./quml-popup.component.css']
})
export class QumlPopupComponent implements OnInit {
  @Input() image = 'https://via.placeholder.com/65';
  @Output() popUpClose = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  closePopup() {
    this.popUpClose.emit();
  }

}
