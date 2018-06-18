import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private posts: Post[]

  constructor() { }

  ngOnInit() {
    ButterService.post.list()
      .then((res) => {
        this.posts = res.data.data
      }, (res) => {
        console.log(res.data)
      })
  }

}
