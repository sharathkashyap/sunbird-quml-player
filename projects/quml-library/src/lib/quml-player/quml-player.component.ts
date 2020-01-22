import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { questionSet } from './data';


@Component({
  selector: 'lib-quml-player',
  templateUrl: './quml-player.component.html',
  styleUrls: ['./quml-player.component.css']
})
export class QumlPlayerComponent implements OnInit {
  @Input() questions: any;
  @ViewChild('car') car: CarouselComponent;
  slides: any;
  slideInterval: number;
  showIndicator: Boolean;
  noWrapSlides: Boolean;
  questionData = this.getQuestionData();
  CarouselConfig = {
    NEXT : 1,
    PREV : 2
  };

  constructor() {
  }

  getQuestionData() {
     return questionSet.stage[0]['org.ekstep.questionset'][0]['org.ekstep.question'];
  }

  ngOnInit() {
    this.slideInterval = 0;
    this.showIndicator = false;
    this.noWrapSlides = false;
    this.questions = this.questions ? this.questions : this.questionData;
  }

  nextSlide() {
    this.car.move(this.CarouselConfig.NEXT);
  }

  prevSlide() {
    this.car.move(this.CarouselConfig.PREV);
  }

  addSlide() {
    this.slides.push(this.questions.length);
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
