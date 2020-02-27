import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quml-mcq-image-option',
  templateUrl: './mcq-image-option.component.html',
  styleUrls: ['./mcq-image-option.component.css']
})
export class McqImageOptionComponent implements OnInit {
  showQumlPopup = false;
  constructor() { }

  ngOnInit() {
  }

  closePopUp() {
    this.showQumlPopup = false;
  }

}
