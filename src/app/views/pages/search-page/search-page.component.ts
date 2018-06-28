import { Component, PLATFORM_ID, Optional, Inject } from '@angular/core';
import { Post } from '../../../models/post';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, TransferState, Meta, makeStateKey } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { GlobalConfig } from "../../../configs/global-config";
import { SSRPageComponent } from '../ssr-page-component';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

const KEY_DATA = makeStateKey('KEY_DATA')

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent extends SSRPageComponent {
  public posts: Post[]
  public query: string

  constructor(
    activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) response: any,
    transferState: TransferState,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    super(activatedRoute, platformId, response, transferState)
  }

  onBrowserInit(params: Params) {
    let data = this.transferState.get(KEY_DATA, null)
    this.transferState.set(KEY_DATA, null)
    if (data) {
      this.initView(data)
      return;
    }

    this.query = params['query']
    if (this.query) {
      ButterService.post.search(this.query, {
        page: 1,
        page_size: GlobalConfig.SEARCH_MAXIMUM_RESULTS
      })
      .then((res) => {
        this.initView(res.data)
        window.scrollTo(0, 0)
      }, (res) => {
        
      })
    }
  }

  onServerInit(params: Params) {
    let data = this.response.locals.result.data
    this.initView(data)
    this.transferState.set(KEY_DATA, data)
  }

  initView(data) {
    this.titleService.setTitle("Tìm kiếm")
    this.posts = data.data
    this.metaService.addTags([
      {property: 'og:url', content: this.router.url},
      {property: 'og:title', content: 'Tìm kiếm'},
      {property: 'og:description', content: GlobalConfig.BLOG_DESCRIPTION},
      {property: 'og:image', content: GlobalConfig.BLOG_FEATURE_IMAGE_URL},
      {property: 'og:type', content: 'website'},
    ])
  }

  performSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query
      }
    })
  }
}
