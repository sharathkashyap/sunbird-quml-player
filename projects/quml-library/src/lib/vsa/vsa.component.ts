import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { veryShortAnswerData } from './data';

@Component({
  selector: 'lib-vsa',
  templateUrl: './vsa.component.html',
  styleUrls: ['./vsa.component.css', '../quml-library.component.css']
})
export class VsaComponent implements OnInit {

  @Input() data: any = veryShortAnswerData.result.assessment_item;
  veryShortAnswerQuestion: string;
  veryShortAnswerSolution: string;
  @Input() layout = 'Column';

  constructor() {
    this.veryShortAnswerQuestion = this.data.question;
    this.veryShortAnswerSolution = this.data.solutions[0];
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
    const mathTextDivs = document.getElementsByClassName('mathText');
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
