import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../../models/post';

@Component({
  selector: 'app-carousel-post-item',
  templateUrl: './carousel-post-item.component.html',
  styleUrls: ['./carousel-post-item.component.scss']
})
export class CarouselPostItemComponent implements OnInit {
  @Input() post: Post

  constructor() { }

  ngOnInit() {
  }
}
