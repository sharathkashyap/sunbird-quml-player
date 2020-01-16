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

  @Input() mcqData?: any;
  veryShortAnswerQuestion: string;
  veryShortAnswerSolution: string;
  @Input() layout?: string;
  @Output() componentLoaded = new EventEmitter<any>();
  @Input() identifier: any;

  constructor() {
  }

  ngOnInit() {
    this.renderLatex();
    this.mcqData = this.mcqData ? this.mcqData : veryShortAnswerData;
    this.layout = this.layout ? this.layout : 'Default';

    this.veryShortAnswerQuestion = this.mcqData.result.assessment_item.question;
    this.veryShortAnswerSolution = this.mcqData.result.assessment_item.solutions[0];
    this.componentLoaded.emit({event : 'Vsa Component Loaded'});
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
