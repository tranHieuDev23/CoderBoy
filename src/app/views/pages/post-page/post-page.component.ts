import { SSRPageComponent } from "../ssr-page-component";
import { Component, ViewEncapsulation, ViewChild, ElementRef, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { isPlatformBrowser } from "@angular/common";

const KEY_DATA = makeStateKey('KEY_DATA')

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent extends SSRPageComponent {
  public post: Post;
  public prevPost: Post;
  public nextPost: Post;
  private highlighted: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    protected activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) private response: any,
    private transferState: TransferState
  ) {
    super(activatedRoute, platformId)
  }

  onBrowserInit(params: Params): void {
    let data = this.transferState.get(KEY_DATA, null)

    if (data != null)
      this.setupPostView(data)
    else {
      window.scrollTo(0, 0)
      let slug = params['slug']
      ButterService.post.retrieve(slug)
        .then((res) => {
          this.setupPostView(res.data)
        }, () => {
          this.router.navigateByUrl('/404', {
            skipLocationChange: false
          })
        })
    }

    this.transferState.set(KEY_DATA, null)
  }

  onServerInit(params: Params): void {
    let data = this.response.locals.result.data;
    this.transferState.set(KEY_DATA, data)
    this.setupPostView(data)
  }

  setupPostView(data: any): void {
    this.post = data.data
    this.prevPost = data.meta.previous_post
    this.nextPost = data.meta.next_post
    this.titleService.setTitle(this.post.title)
    this.addSEOMetaTags()
  }

  addSEOMetaTags(): void {
    this.metaService.addTags([
      {property: 'og:url', content: this.router.url},
      {property: 'og:title', content: this.post.title},
      {property: 'og:description', content: this.post.meta_description},
      {property: 'og:image', content: this.post.featured_image},
      {property: 'og:type', content: 'article'},
    ])
  }

  ngAfterViewChecked() {
    if (!this.highlighted) {
      if (isPlatformBrowser(this.platformId)) {
        
        this.highlighted = true
      }
    }
  }
}
