import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  private post: Post;
  private prevPost: Post;
  private nextPost: Post;

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) =>{
      this.initView()
    })
  }

  initView() {
    window.scrollTo(0, 0)
    this.loadingScreen.showSpinner()
    let slug = this.router.url.split('/')[2]
    ButterService.post.retrieve(slug)
      .then((res) => {
        this.post = res.data.data
        this.prevPost = res.data.meta.previous_post;
        this.nextPost = res.data.meta.next_post;
        this.titleService.setTitle(this.post.title)
        this.loadingScreen.hideSpinner()
      }, (res) => {
        console.log(res.data);
        this.router.navigateByUrl('/404')
      })
  }
}
