import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() public posts: Post[];

  constructor() { }

  ngOnInit() {
  }
}
