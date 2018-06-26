import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Tag } from '../../../models/tag';
import { GlobalConfig } from "../../../configs/global-config";

@Component({
  selector: 'app-tag-list-page',
  templateUrl: './tag-list-page.component.html',
  styleUrls: ['./tag-list-page.component.scss']
})
export class TagListPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  public tags: Tag[]

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    ButterService.tag.list()
      .then((res) => {
        this.tags = res.data.data
        this.titleService.setTitle('Danh mục tag trên trang')
        this.loadingScreen.hideSpinner()
      }, (res) => {
        console.log(res.data)
      })
  }

  addSEORelatedTags(): void {
    this.metaService.addTags([
      {name: 'og:title', content: "Danh mục tag trên trang"},
      {name: 'og:image', content: GlobalConfig.BLOG_FEATURE_IMAGE_URL},
      {name: 'fb:app_id', content: GlobalConfig.FACEBOOK_APP_ID},
      {name: 'og:type', content: 'website'}
    ])
  }
}
