import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'quml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() questions?: any;
  @Input() disablePreviousNavigation: boolean;
  @Output() nextSlideClicked = new EventEmitter<any>();
  @Output() prevSlideClicked = new EventEmitter<any>();
  constructor() {
  }


  ngOnInit() {

  }

  nextSlide() {
    this.nextSlideClicked.emit({event : 'next clicked'});
  }

  prevSlide() {
    if (!this.disablePreviousNavigation) {
      this.prevSlideClicked.emit({ event: 'previous clicked' });
    }
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '100%';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.body.style.backgroundColor = 'white';
  }

}
