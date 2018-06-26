import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  public posts: Post[];
  @Output() done: EventEmitter<void> = new EventEmitter();  

  constructor() { }

  ngOnInit() {
    ButterService.post.list({
      page: 1,
      page_size: 5,
      exclude_body: true
    }).then((res) => {
      this.posts = res.data.data
      this.done.emit()
    }, (res) => {
      console.log(res.data)
    })
  }
}
