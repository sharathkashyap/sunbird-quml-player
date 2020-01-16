import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { shortAnswerQuestionData } from './data';

declare var katex: any;

@Component({
  selector: 'lib-sa',
  templateUrl: './sa.component.html',
  styleUrls: ['./sa.component.css' , '../quml-library.component.css']
})
export class SaComponent implements OnInit {

  @Input() data: any = shortAnswerQuestionData.result.assessment_item;
  shortAnswerQuestion: string;
  ShortAnswerSolution: string;
  @Input() layout = 'Multi';
  @Input() identifier: any;

  constructor(
    public domSanitizer: DomSanitizer
  ) {
    this.shortAnswerQuestion = this.domSanitizer.sanitize
      (SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(this.data.body));
    this.ShortAnswerSolution = this.domSanitizer.sanitize(SecurityContext.HTML,
      this.domSanitizer.bypassSecurityTrustHtml(this.data.solutions[0]));
  }

  ngOnInit() {
    this.renderLatex();
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
