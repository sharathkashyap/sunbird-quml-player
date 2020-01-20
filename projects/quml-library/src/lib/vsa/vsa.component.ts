import { Component, OnInit, Input, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { veryShortAnswerData } from './data';

@Component({
  selector: 'lib-vsa',
  templateUrl: './vsa.component.html',
  styleUrls: ['./vsa.component.css', '../quml-library.component.css']
})
export class VsaComponent implements OnInit {

  @Input() questions?: any;
  @Input() layout?: string;
  @Output() componentLoaded = new EventEmitter<any>();
  @Input() identifier: any;
  veryShortAnswerQuestion: string;
  veryShortAnswerSolution: string;
  constructor() {
  }

  ngOnInit() {
    this.renderLatex();
    this.questions = this.questions ? this.questions : veryShortAnswerData;
    this.layout = this.layout ? this.layout : 'Default';
    this.veryShortAnswerQuestion = this.questions.result.assessment_item.question;
    this.veryShortAnswerSolution = this.questions.result.assessment_item.solutions[0];
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
