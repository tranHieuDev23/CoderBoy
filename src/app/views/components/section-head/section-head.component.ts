import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-head',
  templateUrl: './section-head.component.html',
  styleUrls: ['./section-head.component.scss']
})
export class SectionHeadComponent implements OnInit {
  @Input() text: string;
  
  constructor() { }

  ngOnInit() {
  }

}
