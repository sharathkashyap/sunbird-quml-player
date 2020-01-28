import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quml-endpage',
  templateUrl: './endpage.component.html',
  styleUrls: ['./endpage.component.css']
})
export class EndpageComponent implements OnInit {
  
  constructor() { 
  
  }

  ngOnInit() {
  }
  replayContent($event) {
    console.log("Replay Content");
  }
  exitContent($event) {
    console.log("Exit Content");
  }

}
