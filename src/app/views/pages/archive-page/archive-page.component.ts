import { Component, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { Post } from '../../../models/post';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, TransferState, Meta, makeStateKey } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { GlobalConfig } from '../../../configs/global-config';
import { Author } from '../../../models/author';
import { SSRComponent } from '../../ssr-component';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

const KEY_DATA = makeStateKey('KEY_DATA')
const KEY_STATUS = makeStateKey('KEY_STATUS')

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent extends SSRComponent {
  public author: Author
  public posts: Post[]
  public title: string
  public currentPage: number
  public lastPage: number
  public baseUrl: string

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

  onBrowserInit(params: any) {
    let status = this.transferState.get(KEY_STATUS, null)
    this.transferState.set(KEY_STATUS, null)
    if (status == '404') {
      this.router.navigateByUrl('/404', {
        skipLocationChange: true,
        replaceUrl: false
      })
      return
    }

    let data = this.transferState.get(KEY_DATA, null)
    this.transferState.set(KEY_DATA, null)
    if (data != null) {
      this.initView(data.resultMeta, data.resultPosts, data.type, data.slug, data.currentPage)
      return
    }

    let type = params['type']
    if (type != 'category' && type != 'tag' && type != 'author') {
      this.router.navigateByUrl('/404', {
        skipLocationChange: true,
        replaceUrl: false
      })
      return
    }
    let slug = params['slug']
    let currentPage = params['page'] != null? +params['page'] : 1

    ButterService[type].retrieve(slug)
    .then((resultMeta) => {
      const REQUEST_PARAMS: any = {
        page: this.currentPage,
        page_size: GlobalConfig.ARCHIVE_PAGE_SIZE
      }
      if (type == 'category')
        REQUEST_PARAMS.category_slug = slug
      if (type == 'tag')
        REQUEST_PARAMS.tag_slug = slug
      if (type == 'author')
        REQUEST_PARAMS.author_slug = slug

      ButterService.post.list(REQUEST_PARAMS)
        .then((resultPosts) => {
          this.initView(resultMeta, resultPosts, type, slug, currentPage)
          window.scrollTo(0, 0)
        }, () => {
          this.router.navigateByUrl('/404', {
            skipLocationChange: true,
            replaceUrl: false
          })
        })
    }, () => {
      this.router.navigateByUrl('/404', {
        skipLocationChange: true,
        replaceUrl: false
      })
    })
  }

  onServerInit(params: Params) {
    if (this.response.locals.status == '404') {
      this.router.navigateByUrl('/404', {
        skipLocationChange: true,
        replaceUrl: false
      })
      this.transferState.set(KEY_STATUS, '404')
      this.response.status(404)
      return
    }
    
    let data = this.response.locals.data
    this.initView(data.resultMeta, data.resultPosts, data.type, data.slug, data.currentPage)
    this.transferState.set(KEY_DATA, data)
  }

  initView(resultMeta: any, resultPosts: any, type: string, slug: string, currentPage: number): void {
    this.title = this.generateTitle(type, resultMeta.data.data)
    if (type == 'author') {
      this.author = resultMeta.data.data
      this.titleService.setTitle(`${resultMeta.data.data.last_name} ${resultMeta.data.data.first_name}`)
    } else {
      this.titleService.setTitle(resultMeta.data.data.name)
    }
    this.posts = resultPosts.data.data
    this.currentPage = currentPage
    this.lastPage = Math.floor(
      (resultPosts.data.meta.count + GlobalConfig.ARCHIVE_PAGE_SIZE - 1) / GlobalConfig.ARCHIVE_PAGE_SIZE
    )
    this.baseUrl = `/archive/${type}/${slug}`
    this.addSEOMetaTags()
  }

  generateTitle(type: string, data: any): string {
    if (type == 'category')
      return `Bài viết thuộc chủ đề ${data.name}`
    if (type == 'tag')
      return `Bài viết gắn tag ${data.name}`
    if (type == 'author')
      return `Bài viết của tác giả ${data.last_name} ${data.first_name}`
  }

  addSEOMetaTags(): void {
    this.metaService.addTags([
      {property: 'og:url', content: this.router.url},
      {property: 'og:title', content: this.title},
      {property: 'og:description', content: `Trang ${this.currentPage} trên ${this.lastPage}`},
      {property: 'og:image', content: GlobalConfig.BLOG_FEATURE_IMAGE_URL},
      {property: 'og:type', content: 'website'},
    ])
  }
}
