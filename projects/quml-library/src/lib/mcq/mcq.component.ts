import { Component, OnInit, Input, SecurityContext, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { questionData } from './data';

declare var katex: any;

@Component({
  selector: 'quml-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css', '../quml-library.component.css'],

})
export class McqComponent implements OnInit, AfterViewInit {
  @Input() public question?: any;
  @Input() identifier: any;
  @Input() public layout?: string;

  @Output() componentLoaded = new EventEmitter<any>();
  @Output() answerChanged = new EventEmitter<any>();
  @Output() optionSelected = new EventEmitter<number>();

  mcqQuestion: any;
  options: any;
  mcqOptions: any[] = [];
  selectedOptionTarget: any;
  showQumlPopup = false;



  constructor(public domSanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    this.componentLoaded.emit({ event: 'mcq component has been loaded' });
    this.renderLatex();
    this.question = this.question ? this.question : questionData;
    this.layout = this.layout ? this.layout : 'IMAGEGRID';
    if (this.question.editorState != null) {
      if (this.question.templateId === 'mcq-vertical') {
        this.layout = 'DEFAULT';
      } else if (this.question.templateId === 'mcq-horizontal') {
        const urlArr = [];
        for (let i = 0; i < this.question.media.length; i++) {
          const url = 'https://preprod.ntp.net.in' + this.question.media[i].src;
          urlArr.push(url);
        }
        this.question.editorState.quwstionUrl = urlArr[0];
        urlArr.shift();
        for (let i = 0; i < urlArr.length; i++) {
          this.question.editorState.options[i].url = urlArr[i];
        }
        this.layout = 'IMAGEGRID';
      } else if (this.question.templateId === 'mcq-vertical mcq-split') {
        const urlArr = [];
        for (let i = 0; i < this.question.media.length; i++) {
          const url = 'https://preprod.ntp.net.in' + this.question.media[i].src;
          urlArr.push(url);
        }
        this.question.editorState.quwstionUrl = urlArr[0];
        urlArr.shift();
        for (let i = 0; i < urlArr.length; i++) {
          if (Boolean(this.question.editorState.options[i].url)) {
            this.question.editorState.options[i].url = urlArr[i];
          }
        }
        this.layout = 'IMAGEQAGRID';
      }
      this.mcqQuestion = this.domSanitizer.sanitize(SecurityContext.HTML,
        this.domSanitizer.bypassSecurityTrustHtml(this.question.editorState.question));
      this.options = this.question.editorState.options;
    } else if (this.question.editorState === null) {
      if (this.question.templateId === 'mcq-grid mcq-split') {
        this.layout = 'IMAGEQAGRID';
      } if (this.question.templateId === 'mcq-horizontal') {
        this.layout = 'IMAGEGRID';
      } else if (this.question.templateId  === 'mcq-vertical') {
        this.layout = 'DEFAULT';
      }
      this.mcqQuestion = this.domSanitizer.sanitize(SecurityContext.HTML,
        this.domSanitizer.bypassSecurityTrustHtml(this.question.body));
      this.options = this.question.options;

    }
    this.initOptions();
  }

  ngAfterViewInit() {
    const el = document.getElementsByClassName('mcq-options');
    if (el != null && el.length > 0) {
      el[0].remove();
    }
  }

  initOptions() {
    for (let j = 0; j < this.options.length; j++) {
      let imageUrl;
      if (this.options[j].url) {
        imageUrl = this.options[j].url;
      }
      const option = this.options[j];
      const optionValue = option.value.body;
      const optionHtml = this.domSanitizer.sanitize(SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(optionValue));
      const selected = false;
      const optionToBePushed: any = {};
      optionToBePushed.index = j;
      optionToBePushed.optionHtml = optionHtml;
      optionToBePushed.selected = selected;
      optionToBePushed.url = imageUrl;
      this.mcqOptions.push(optionToBePushed);
    }
  }



  renderLatex() {
    const _instance = this;
    setTimeout(function () {
      _instance.replaceLatexText();
    }, 0);
  }

  replaceLatexText() {
    const questionElement = document.getElementById(this.identifier);
    const mathTextDivs = questionElement.getElementsByClassName('mathText');
    for (let i = 0; i < mathTextDivs.length; i++) {
      const mathExp = mathTextDivs[i];
      const textToRender = mathExp.innerHTML;
      katex.render(textToRender, mathExp, { displayMode: false, output: 'html', throwOnError: true });
    }
  }

  onOptionSelect(event) {
    const mcqOption = event.option;
    // const parsedQuestion = JSON.parse(this.question.__cdata);
    this.answerChanged.emit({ event: 'Option has been changed' });
    this.mcqOptions.forEach(mcqOptionElement => {
      if (mcqOptionElement.index === event.option.index) {
        mcqOptionElement.selected = true;
      } else {
        mcqOptionElement.selected = false;
      }
    });
    this.mcqOptions.forEach((element) => {
      if (element.value.body === mcqOption.optionHtml) {
        const selectedOption = {
          selectedOption: element,
          result: element.answer
        };
        this.getSelectedOptionAndResult(selectedOption);
      }
    });
  }
  optionSelectedInImage(event) {
    console.log('mcq component ts', event);
    this.onOptionSelect(event);
  }

  getSelectedOptionAndResult(optionObj) {
    this.optionSelected.emit(optionObj);
  }

  showPopup() {
    this.showQumlPopup = true;
  }
  closePopUp() {
    this.showQumlPopup = false;
  }

}
