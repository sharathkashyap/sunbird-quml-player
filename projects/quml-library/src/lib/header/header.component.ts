import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'quml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() questions?: any;
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
    this.nextSlideClicked.emit({event : 'previous clicked'});
  }

 openNav() {
    document.getElementById('mySidenav').style.width = '100%';
  }
   closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }



}
