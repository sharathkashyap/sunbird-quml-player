import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { newQuestionFormatMcq } from './data';
import { data } from './smartLayout-data';


@Component({
  selector: 'quml-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
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
  currentSlideIndex = 0;
  attemptedQuestions = [];
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

  setQuestionType() {
    this.questionClicked.forEach((ele) => {
      ele.questionType = 'mcq';
    });
  }

  nextSlide() {
    console.log(this.car.getCurrentSlideIndex());
    if (this.currentSlideIndex !== this.questions.length) {
      this.currentSlideIndex = this.currentSlideIndex + 1;
    }

    if (this.car.getCurrentSlideIndex() + 1 === this.questions.length) {
      this.loadScoreBoard = true;
      this.endPageReached = true;
      this.getScoreSummary();
      const slide = document.getElementsByTagName('slide');
      return;

    }
    if (this.car.getCurrentSlideIndex() > 0) {
      this.validateSelectedOption(this.optionSelectedObj);
    }
    this.car.move(this.CarouselConfig.NEXT);
    if (!this.attemptedQuestions.includes(this.car.getCurrentSlideIndex())) {
      this.attemptedQuestions.push(this.car.getCurrentSlideIndex());
    }
  }

  getScoreSummary() {
    return this.scoreSummary = {
      answeredQuestionCorrectly: this.answeredQuestionCorrectly,
      skippedQuestion: this.skippedQuestion,
      totalNoOfQuestions: this.questions.length
    };
  }

  getOptionSelected(optionSelected) {
    this.optionSelectedObj = optionSelected;
  }

  async validateSelectedOption(option) {
    const obj = {};
    let updated = false;
    if (this.optionSelectedObj !== undefined) {
      const currentIndex = this.car.getCurrentSlideIndex();
      const currentOptions = this.questions[currentIndex].assessment_item.metadata.editorState.options;
      currentOptions.forEach((ele, index) => {
        if (ele.value.body === option.optionHtml && Boolean(ele.answer)) {
          this.showAlert = true;
          obj['index'] = this.car.getCurrentSlideIndex();
          obj['status'] = true;
          obj['class'] = 'correct';
        } else if (index === currentOptions.length - 1 && !Object.keys(obj).length) {
          obj['index'] = this.car.getCurrentSlideIndex();
          obj['status'] = false;
          obj['class'] = 'wrong';
        }
      });
      this.optionSelectedObj = undefined;
    } else {
      obj['index'] = this.car.getCurrentSlideIndex();
      obj['status'] = false;
      obj['class'] = 'skipped';
    }
    this.scoreBoard.forEach((ele) => {
      if (ele.index === obj['index']) {
        ele['status'] = obj['status'];
        ele['class'] = obj['class'];
        updated = true;
      }
    });
    if (!updated) {
      this.scoreBoard.push(obj);
    }
  }

  prevSlide() {
    if (this.loadScoreBoard) {
      const index = this.questions.length - 1;
      this.car.selectSlide(index);
      this.loadScoreBoard = false;
    }
    console.log(this.attemptedQuestions);
    if (this.attemptedQuestions.includes(this.currentSlideIndex)) {
          const index = this.attemptedQuestions.indexOf(this.car.getCurrentSlideIndex());
          this.attemptedQuestions.splice( index, 1);
    } else if (this.car.getCurrentSlideIndex() === 0) {
          this.attemptedQuestions = [];
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
