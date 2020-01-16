import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';




@Component({
  selector: 'lib-quml-player',
  templateUrl: './quml-player.component.html',
  styleUrls: ['./quml-player.component.css']
})
export class QumlPlayerComponent implements OnInit {
  slides = [1, 2, 3, 4, 5];
  showMcq: Boolean;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'dots': false,
    'infinite': false
  };


  constructor() { }

  ngOnInit() {
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  addSlide() {
    this.slides.push(5);
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
