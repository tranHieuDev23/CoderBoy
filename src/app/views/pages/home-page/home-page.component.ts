import { Component, Inject, PLATFORM_ID, Optional, ViewChild } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Category } from '../../../models/category';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { GlobalConfig } from "../../../configs/global-config";
import { SSRComponent } from '../../ssr-component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';

const KEY_DATA = makeStateKey('KEY_DATA')

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent
  public posts: Post[]
  public categories: Category[]

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
    this.loadingScreen.showSpinner()
    let data = this.transferState.get(KEY_DATA, null)
    this.transferState.set(KEY_DATA, null)

    if (data) {
      this.initView(data)
      window.scrollTo(0, 0)
    }
    else {
      ButterService.category.list()
        .then((res) => {
          this.initView(res.data)
          window.scrollTo(0, 0)
        }, (res) => {
          this.router.navigateByUrl('/404', {
            skipLocationChange: true,
            replaceUrl: false
          })
        })
    }
  }

  onServerInit(params: Params) {
    let data = this.response.locals.result.data
    this.initView(data)
    this.transferState.set(KEY_DATA, data)
  }

  initView(data: any): void {
    this.categories = data.data
    this.titleService.setTitle(GlobalConfig.BLOG_TITLE)
    this.loadingScreen.hideSpinner()
    this.metaService.addTags([
      {property: 'og:url', content: this.router.url},
      {property: 'og:title', content: GlobalConfig.BLOG_TITLE},
      {property: 'og:description', content: GlobalConfig.BLOG_DESCRIPTION},
      {property: 'og:image', content: GlobalConfig.BLOG_FEATURE_IMAGE_URL},
      {property: 'og:type', content: 'website'},
    ])
  } 
}
