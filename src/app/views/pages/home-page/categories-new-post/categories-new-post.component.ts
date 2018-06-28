import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Post } from '../../../../models/post';
import { Category } from '../../../../models/category';
import { ButterService } from '../../../../controllers/butterCMS/butter.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalConfig } from '../../../../configs/global-config';

@Component({
  selector: 'app-categories-new-post',
  templateUrl: './categories-new-post.component.html',
  styleUrls: ['./categories-new-post.component.scss']
})
export class CategoriesNewPostComponent implements OnInit {
  @Input() category: Category
  public posts: Post[]
  private isBrowser: boolean

  constructor(
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit() {
    if (this.isBrowser) {
      ButterService.post.list({
        page: 1,
        page_size: GlobalConfig.HOME_PAGE_CATEGORY_RECENT_SIZE,
        category_slug: this.category.slug,
        exclude_body: true
      }).then((res) => {
        this.posts = res.data.data
      })
    }
  }
}
