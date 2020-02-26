import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'quml-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.css']
})
export class McqQuestionComponent implements OnInit {

  @Input() mcqQuestion:any;
  @Input() layout:any;

  constructor() { }

  ngOnInit() {
  }

}
