import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-layoutstrip',
  templateUrl: './layoutstrip.component.html',
  styleUrls: ['./layoutstrip.component.css']
})
export class LayoutstripComponent implements OnInit {
  strips:any = [];
  stripColors = ["green","brown","yellow"];
  @Output() onlayoutChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
    let stripTexts = ["Default","Multi","Column"];
    let count = 0;
    this.stripColors.forEach(element => {
      let stripObject:any = {};
      stripObject.className = this.stripColors[count];
      if(count == 2) {
        stripObject.selected = true;
      } else {
        stripObject.selected = false;
      }
      stripObject.text = stripTexts[count];
      stripObject.index = count;
      count++;
      this.strips.push(stripObject);
    });
  }

  onLayoutSelect(event,stripObject) {
    this.strips.forEach(element => {
      if(stripObject.index == element.index) {
        element.className = this.stripColors[element.index]+" selected";
        element.selected = true;
        this.onlayoutChange.emit(element);
      } else {
        element.className = this.stripColors[element.index];
        element.selected = false;
      }
    });
  }



}
