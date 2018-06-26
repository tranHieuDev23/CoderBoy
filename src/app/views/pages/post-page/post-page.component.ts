import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  @ViewChild('postContent') postContent: ElementRef;
  public post: Post;
  public prevPost: Post;
  public nextPost: Post;

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) =>{
      this.initView(params)
    })
  }

  initView(params: any) {
    window.scrollTo(0, 0)
    this.loadingScreen.showSpinner()
    let slug = params['slug']
    ButterService.post.retrieve(slug)
      .then((res) => {
        this.post = res.data.data
        this.prevPost = res.data.meta.previous_post
        this.nextPost = res.data.meta.next_post
        this.titleService.setTitle(this.post.title)
        this.loadingScreen.hideSpinner()
        this.addSEORelatedTags()
      }, (res) => {
        console.log(res.data);
        this.router.navigateByUrl('/404', {
          skipLocationChange: false
        })
      })
  }

  addSEORelatedTags(): void {
    this.metaService.addTags([
      {name: 'og:title', content: this.post.seo_title},
      {name: 'og:description', content: this.post.meta_description},
      {name: 'og:image', content: this.post.featured_image},
      {name: 'fb:app_id', content: '1822549548041152'},
      {name: 'og:type', content: 'arcticle'}
    ])
  }
}
