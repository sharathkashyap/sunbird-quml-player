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
  @Output() componentLoaded = new EventEmitter<any>();
  @Output() previousClicked = new EventEmitter<any>();
  @Output() nextClicked = new EventEmitter<any>();
  @Output() questionClicked = new EventEmitter<any>();
  @ViewChild('car') car: CarouselComponent;

  endPageReached:boolean;
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
    this.endPageReached = false;
  }

  getQuestionData() {
    return questionSet.stage[0]['org.ekstep.questionset'][0]['org.ekstep.question'];
  }

  ngOnInit() {
    this.slideInterval = 0;
    this.showIndicator = false;
    this.noWrapSlides = true;
    this.questions = this.questions ? this.questions : this.questionData;
    this.setQuestionType();
  }

  setQuestionType() {
    this.questions.forEach(element => {
      const config = JSON.parse(element.config.__cdata);
      element.questionType = config.metadata.type;
    });
  }

  nextSlide() {
    if(this.car.getCurrentSlideIndex()+1 == this.questions.length) {
      this.endPageReached = true;
      return;
    }
    if (!this.optionSelectedObj) {
      this.car.move(this.CarouselConfig.NEXT);
    }
    if (Boolean(this.optionSelectedObj.result)) {
      this.car.move(this.CarouselConfig.NEXT);
    } else {
      this.showAlert = true;
    }
  }

  skip() {
    this.car.move(this.CarouselConfig.NEXT);
    this.showAlert = false;
  }


  getOptionSelected(optionSelected) {
    this.optionSelectedObj = optionSelected;
  }

  prevSlide() {
    if(this.car.getCurrentSlideIndex()+1 == this.questions.length && this.endPageReached) {
      this.endPageReached = false;
    } else {
      this.car.move(this.CarouselConfig.PREV);
    }
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
