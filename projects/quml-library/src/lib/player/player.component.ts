import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { questionSet } from './data';


@Component({
  selector: 'quml-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questions: any;
  @ViewChild('car') car: CarouselComponent;
  slides: any;
  slideInterval: number;
  showIndicator: Boolean;
  noWrapSlides: Boolean;
  optionSelectedObj: any;
  showAlert: Boolean;
  questionData = this.getQuestionData();
  CarouselConfig = {
    NEXT: 1,
    PREV: 2
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
    this.setQuestionType();
  }

  setQuestionType() {
    this.questions.forEach(element => {
      const config = JSON.parse(element.config.__cdata);
      element.questionType = config.metadata.type;
    });
  }

  skip() {
    this.car.move(this.CarouselConfig.NEXT);
    this.showAlert = false;
  }

  nextSlide() {
    console.log('optionselectedobj', this.optionSelectedObj);
    if (Boolean(this.optionSelectedObj.result)) {
      this.car.move(this.CarouselConfig.NEXT);
    } else {
      this.showAlert = true;
    }
  }

  getOptionSelected(optionSelected) {
    this.optionSelectedObj = optionSelected;
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
