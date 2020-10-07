import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { newQuestionFormatMcq } from './data';
import { data } from './smartLayout-data';


@Component({
  selector: 'quml-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @Input() questions: any;
  @Input() linearNavigation: boolean;
  @Input() duration: any;
  @Output() componentLoaded = new EventEmitter<any>();
  @Output() previousClicked = new EventEmitter<any>();
  @Output() nextClicked = new EventEmitter<any>();
  @Output() questionClicked = new EventEmitter<any>();
  @ViewChild('car') car: CarouselComponent;

  scoreBoard = [];
  endPageReached: boolean;
  slides: any;
  slideInterval: number;
  showIndicator: Boolean;
  noWrapSlides: Boolean;
  optionSelectedObj: any;
  showAlert: Boolean;
  durationSeconds = 0;
  skippedQuestion = 0;
  answeredQuestionCorrectly = 0;
  scoreSummary = {};
  currentSlideIndex = 1;
  loadScoreBoard = false;
  // questionData = this.getQuestionData();
  questionData = data;
  CarouselConfig = {
    NEXT: 1,
    PREV: 2
  };

  constructor() {
    this.endPageReached = false;
  }
  getQuestionData() {
    return newQuestionFormatMcq.result;
  }

  ngOnInit() {
    this.slideInterval = 0;
    this.showIndicator = false;
    this.noWrapSlides = true;
    this.questions = data;
  }

  ngAfterViewInit() {
    console.log('got carousel' , document.getElementsByClassName('carousel-inner'));
  }

  setQuestionType() {
    this.questionClicked.forEach((ele) => {
      ele.questionType = 'mcq';
    });
  }

  nextSlide() {
    if (this.currentSlideIndex !== this.questions.length) {
      this.currentSlideIndex = this.currentSlideIndex + 1;
    }

    // if (this.car.getCurrentSlideIndex() + 2 === this.questions.length) {
        
    // }

    if (this.car.getCurrentSlideIndex() + 1 === this.questions.length) {
    this.loadScoreBoard = true;
      this.endPageReached = true;
      this.getScoreSummary();
      const slide = document.getElementsByTagName('slide');
      return;

    }
    this.validateSelectedOption(this.optionSelectedObj);
    this.car.move(this.CarouselConfig.NEXT);
  }

  getScoreSummary() {
    return this.scoreSummary = {
      answeredQuestionCorrectly: this.answeredQuestionCorrectly,
      skippedQuestion: this.skippedQuestion,
      totalNoOfQuestions: this.questions.length
    };
  }

  skip() {
    this.car.move(this.CarouselConfig.NEXT);
    this.showAlert = false;
    this.optionSelectedObj = {};
  }


  getOptionSelected(optionSelected) {
    this.optionSelectedObj = optionSelected;
  }

  async validateSelectedOption(option) {
    const obj = {};
    if (this.optionSelectedObj !== undefined) {
      const currentIndex = this.car.getCurrentSlideIndex();
      const currentOptions = this.questions[currentIndex].assessment_item.metadata.editorState.options;
      currentOptions.forEach((ele, index) => {
        if (ele.value.body === option.optionHtml && Boolean(ele.answer)) {
          this.showAlert = true;
          obj['index'] = this.car.getCurrentSlideIndex() + 1;
          obj['status'] = true;
          obj['class'] = 'correct';
        } else if (index === currentOptions.length - 1 && !Object.keys(obj).length) {
          obj['index'] = this.car.getCurrentSlideIndex() + 1;
          obj['status'] = false;
          obj['class'] = 'wrong';
        }
      });
    } else {
      obj['index'] = this.car.getCurrentSlideIndex() + 1;
      obj['status'] = false;
      obj['class'] = 'skipped';
    }
    this.scoreBoard.push(obj);
  }

  prevSlide() {
    if (this.loadScoreBoard) {
        const index = this.questions.length - 1;
        this.car.selectSlide(index);
        this.loadScoreBoard = false;
    }
    if (this.currentSlideIndex > 1) {
      this.currentSlideIndex = this.currentSlideIndex - 1;
    }
    if (this.car.getCurrentSlideIndex() + 1 === this.questions.length && this.endPageReached) {
      this.endPageReached = false;
    } else if (!this.linearNavigation) {
      this.car.move(this.CarouselConfig.PREV);
    }
  }

  addSlide() {
    this.slides.push(this.questions.length);
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  nextSlideClicked(event) {
    if (event = 'next clicked') {
      this.nextSlide();
    }
  }

  previousSlideClicked(event) {
    if (event = 'previous clicked') {
      this.prevSlide();
    }
  }
  replayContent() {
    this.endPageReached = false;
    this.currentSlideIndex = 1;
    this.car.selectSlide(0);
  }

  goToSlide(index) {
    this.currentSlideIndex = index + 1;
    this.car.selectSlide(index);
  }

}
