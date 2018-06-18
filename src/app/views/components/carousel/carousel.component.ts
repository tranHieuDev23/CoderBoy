import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  private posts: Post[];

  constructor() { }

  ngOnInit() {
    ButterService.post.list({
      page: 1,
      page_size: 5,
      exclude_body: true
    }).then((res) => {
      this.posts = res.data.data
    }, (res) => {
      console.log(res.data)
    })
  }
}
