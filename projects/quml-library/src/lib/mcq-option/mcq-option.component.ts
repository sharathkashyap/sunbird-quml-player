import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'quml-mcq-option',
  templateUrl: './mcq-option.component.html',
  styleUrls: ['./mcq-option.component.css']
})
export class McqOptionComponent implements OnInit, AfterViewInit {

  @Input() mcqOptions: any;
  @Input() layout: any;
  @Output() showPopup = new EventEmitter();
  @Output() optionSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const dom = document.getElementsByTagName('figure');
    for (let i = 0; i < dom.length; i++) {
      dom[i].firstElementChild['style'].width = '50%';
    }
  }

  onOptionSelect(event, mcqOption) {
    this.optionSelected.emit({ name: 'optionSelect', option: mcqOption });
  }
  onImageOptionSelected(event) {
    this.onOptionSelect(event, event.option);
  }

  showQumlPopup() {
    this.showPopup.emit();
  }
}
