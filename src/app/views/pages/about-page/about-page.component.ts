import { Component, PLATFORM_ID, Inject, Optional, ViewChild } from '@angular/core';
import { Author } from '../../../models/author';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import html from '../../../configs/blog-description.html';
import { GlobalConfig } from "../../../configs/global-config";
import { SSRComponent } from '../../ssr-component';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';

const KEY_DATA = makeStateKey('KEY_DATA')

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent
  public blogDescription: string = html;
  public authors: Author[]

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

  onBrowserInit(params: Params): void {
    this.loadingScreen.showSpinner()
    let data = this.transferState.get(KEY_DATA, null)
    this.transferState.set(KEY_DATA, null)
    if (data) {
      this.initView(data)
      return;
    }

    ButterService.author.list()
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

  onServerInit(params: Params): void {
    let data = this.response.locals.result.data
    this.initView(data)
    this.transferState.set(KEY_DATA, data)
  }

  initView(data: any) {
    this.authors = data.data
    this.titleService.setTitle('About')
    this.metaService.addTags([
      {property: 'og:url', content: this.router.url},
      {property: 'og:title', content: 'About'},
      {property: 'og:description', content: GlobalConfig.BLOG_DESCRIPTION},
      {property: 'og:image', content: GlobalConfig.BLOG_FEATURE_IMAGE_URL},
      {property: 'og:type', content: 'website'},
    ])
    this.loadingScreen.hideSpinner()
  }
}
