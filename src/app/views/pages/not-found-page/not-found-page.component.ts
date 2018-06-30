import { Component, PLATFORM_ID, Optional, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, TransferState, Meta } from '@angular/platform-browser';
import { GlobalConfig } from "../../../configs/global-config";
import { SSRComponent } from '../../ssr-component';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent extends SSRComponent {
  public message: string = GlobalConfig.MESSAGE_404
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

  onBrowserInit() {
    this.initView()
    window.scrollTo(0, 0)
  }

  onServerInit() {
    this.initView()
  }

  performSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query
      }
    })
  }

  initView() {
    this.titleService.setTitle("404 Not Found")
    this.metaService.addTags([
      {name: 'description', content: GlobalConfig.BLOG_DESCRIPTION},
      {property: 'og:url', content: this.router.url},
      {property: 'og:title', content: 'About'},
      {property: 'og:description', content: GlobalConfig.BLOG_DESCRIPTION},
      {property: 'og:image', content: GlobalConfig.BLOG_FEATURE_IMAGE_URL},
      {property: 'og:type', content: 'website'},
    ])
  }
}
