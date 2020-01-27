import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'quml-endpage',
  templateUrl: './endpage.component.html',
  styleUrls: ['./endpage.component.css']
})
export class EndpageComponent implements OnInit {
  @Input() scoreSummary;
  score: any;
  constructor() {

  }

  ngOnInit() {
   console.log('score summary' , this.scoreSummary);
  }

}
