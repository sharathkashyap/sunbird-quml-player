import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import {katex} from 'katex';
import { questionData } from './data';

declare var katex:any;

@Component({
  selector: 'lib-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css'],

})
export class McqComponent implements OnInit {


  @Input() mcqData: any = "questionData.result.assessment_item.question";
  mcqQuestion:any;
  mcqOptions: any[] = [];
  @Input() layout:string = "Column";
  constructor(public domSanitizer:DomSanitizer) { 
    /*let html = katex.renderToString(questionData.result.assessment_item.body, {
      throwOnError: false
    });*/
    this.mcqQuestion = this.domSanitizer.sanitize(SecurityContext.HTML,this.domSanitizer.bypassSecurityTrustHtml(questionData.result.assessment_item.question));
    var options = questionData.result.assessment_item.options;
    for(var j=0;j<options.length;j++) {
      var option = options[j];
      var optionValue  = option.value.body;
      var optionHtml = this.domSanitizer.sanitize(SecurityContext.HTML,this.domSanitizer.bypassSecurityTrustHtml(optionValue));
      var selected = false;
      let optionToBePushed:any = {};
      optionToBePushed.index = j;
      optionToBePushed.optionHtml = optionHtml;
      optionToBePushed.selected = selected;
      this.mcqOptions.push(optionToBePushed);
    }
  }

  ngOnInit() {
   this.renderLatex();
  }
  renderLatex() {
    let _instance = this;
    setTimeout(function(){
      _instance.replaceLatexText();
    },0);
  }
  replaceLatexText() {
    var mathTextDivs = document.getElementsByClassName("mathText");
    for(var i=0;i<mathTextDivs.length;i++) {
      var mathExp = mathTextDivs[i];
      var textToRender = mathExp.innerHTML;
      katex.render(textToRender,mathExp,{displayMode: false,output: 'html',throwOnError: true});
    }
  }
  onOptionSelect(event,mcqOption) {
    this.mcqOptions.forEach(mcqOptionElement => {
      if(mcqOptionElement.index == mcqOption.index) {
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
