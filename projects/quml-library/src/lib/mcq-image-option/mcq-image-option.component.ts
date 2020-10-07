import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'quml-mcq-image-option',
  templateUrl: './mcq-image-option.component.html',
  styleUrls: ['./mcq-image-option.component.css']
})
export class McqImageOptionComponent implements OnInit, AfterViewInit {
  showQumlPopup = false;
  qumlPopupImage: any;
  @Input() mcqQuestion: any;
  @Input() mcqOption: any;
  @Output() imgOptionSelected = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // const dom = document.getElementsByTagName('figure');
    // for (let i = 0; i < dom.length; i++) {
    //   dom[i].firstElementChild['style'].width = '100%';
    // }
  }

  showPopup(image) {
    this.showQumlPopup = true;
    this.qumlPopupImage = image;

  }

  optionClicked(mcqOption) {
    this.imgOptionSelected.emit({ name: 'optionSelect', option: mcqOption });
  }

  closePopUp() {
    this.showQumlPopup = false;
  }

}
