import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { longAnswerData } from './data';
import { DomSanitizer } from '@angular/platform-browser';
import { from } from 'rxjs';

declare var katex: any;

@Component({
  selector: 'lib-la',
  templateUrl: './la.component.html',
  styleUrls: ['./la.component.css' , '../quml-library.component.css']
})
export class LaComponent implements OnInit {

  @Input() data: any = longAnswerData.result.assessment_item;
  longAnswerQuestion: string;
  longAnswerSolution: string;
  @Input() layout = 'Column';
  @Input() identifier: any;

  constructor(
    public domSanitizer: DomSanitizer
  ) {
    this.longAnswerQuestion = this.domSanitizer.sanitize
    (SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(this.data.body));
    this.longAnswerSolution = this.domSanitizer.sanitize
    (SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(this.data.solutions[0]));
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
