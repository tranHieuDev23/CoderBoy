import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit {
  private post: Post;

  constructor(
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    let slug = this.router.url.split('/')[2]
    ButterService.post.retrieve(slug)
      .then((res) => {
        this.post = res.data.data
        this.titleService.setTitle(this.post.title)
      }, (res) => {
        console.log(res.data);
        this.router.navigateByUrl('/404')
      })
  }
}
