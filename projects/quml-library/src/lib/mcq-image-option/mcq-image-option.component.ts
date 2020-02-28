import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'quml-mcq-image-option',
  templateUrl: './mcq-image-option.component.html',
  styleUrls: ['./mcq-image-option.component.css']
})
export class McqImageOptionComponent implements OnInit {
  showQumlPopup = false;
  @Input() mcqQuestion: any;
  @Input() mcqOption: any;
  @Output() imgOptionSelected = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  optionClicked(mcqOption) {
    this.imgOptionSelected.emit({name: 'optionSelect', option: mcqOption});
  }

  closePopUp() {
    this.showQumlPopup = false;
  }

}
