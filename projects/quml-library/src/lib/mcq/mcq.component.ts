import { Component, OnInit, Input, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { questionData } from './data';

declare var katex: any;

@Component({
  selector: 'quml-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css' , '../quml-library.component.css'],

})
export class McqComponent implements OnInit {


  @Input() public questions?: any;
  @Input() identifier: any;
  mcqQuestion: any;
  mcqOptions: any[] = [];
  @Input() public layout?: string;
  @Output() componentLoaded = new EventEmitter<any>();
  @Output() answerChanged = new EventEmitter<any>();

  constructor(public domSanitizer: DomSanitizer) {

  }

  ngOnInit() {

    this.componentLoaded.emit({event: 'mcq component has been loaded'});
    this.renderLatex();
    this.questions = this.questions ? this.questions : questionData;
    this.layout = this.layout ? this.layout : 'Default';
    console.log('mcqData after ternary', this.questions, this.layout);
    this.mcqQuestion = this.domSanitizer.sanitize(SecurityContext.HTML,
      this.domSanitizer.bypassSecurityTrustHtml(this.questions.result.assessment_item.question));
    const options = this.questions.result.assessment_item.options;
    for (let j = 0; j < options.length; j++) {
      const option = options[j];
      const optionValue = option.value.body;
      const optionHtml = this.domSanitizer.sanitize(SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(optionValue));
      const selected = false;
      const optionToBePushed: any = {};
      optionToBePushed.index = j;
      optionToBePushed.optionHtml = optionHtml;
      optionToBePushed.selected = selected;
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

  onOptionSelect(event, mcqOption) {
    this.answerChanged.emit({event: 'Option has been changed' });
    this.mcqOptions.forEach(mcqOptionElement => {
      if (mcqOptionElement.index === mcqOption.index) {
        mcqOptionElement.selected = true;
      } else {
        mcqOptionElement.selected = false;
      }
    });
  }

  switchLayout(stripData) {
    this.layout = stripData.text;
    this.renderLatex();
  }

}
