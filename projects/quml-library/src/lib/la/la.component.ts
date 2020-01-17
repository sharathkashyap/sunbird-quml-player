import { Component, OnInit, Input, SecurityContext, Output, EventEmitter } from '@angular/core';
import { longAnswerData } from './data';
import { DomSanitizer } from '@angular/platform-browser';

declare var katex: any;

@Component({
  selector: 'lib-la',
  templateUrl: './la.component.html',
  styleUrls: ['./la.component.css' , '../quml-library.component.css']
})
export class LaComponent implements OnInit {

  @Input() questions?: any;
  @Input() layout: String;
  @Output() componentLoaded = new EventEmitter<any>();
  @Input() identifier: any;
  longAnswerQuestion: string;
  longAnswerSolution: string;

  constructor(
    public domSanitizer: DomSanitizer
  ) {
   }

   ngOnInit() {
    this.renderLatex();
    this.questions = this.questions ? this.questions : longAnswerData;
    this.layout = this.layout ? this.layout : 'Column';
    this.longAnswerQuestion = this.domSanitizer.sanitize
    (SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(this.questions.result.assessment_item.body));
    this.longAnswerSolution = this.domSanitizer.sanitize
    (SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(this.questions.result.assessment_item.solutions[0]));

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

  switchLayout(stripData) {
    this.layout = stripData.text;
    this.renderLatex();
  }

}
