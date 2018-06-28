import { Component, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Tag } from '../../../models/tag';
import { GlobalConfig } from "../../../configs/global-config";
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { SSRPageComponent } from '../ssr-page-component';

const KEY_DATA = makeStateKey('KEY_DATA')

@Component({
  selector: 'app-tag-list-page',
  templateUrl: './tag-list-page.component.html',
  styleUrls: ['./tag-list-page.component.scss']
})
export class TagListPageComponent extends SSRPageComponent {
  public tags: Tag[]
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

    ButterService.tag.list()
      .then((res) => {
        this.initView(res.data)
        window.scrollTo(0, 0)
      }, (res) => {
        console.log(res.data)
      })
  }

  onServerInit(params: Params) {
    let data = this.response.locals.result.data
    this.initView(data)
    this.transferState.set(KEY_DATA, data)
  }

  initView(data) {
    this.titleService.setTitle("Danh mục tag trên trang")
    this.tags = data.data
    this.metaService.addTags([
      {property: 'og:url', content: this.router.url},
      {property: 'og:title', content: 'Danh mục tag trên trang'},
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
