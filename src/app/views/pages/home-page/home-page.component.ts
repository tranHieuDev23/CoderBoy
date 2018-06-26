import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Category } from '../../../models/category';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { GlobalConfig } from "../../../configs/global-config";
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  public posts: Post[]
  public categories: Category[]

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    ButterService.category.list()
      .then((res) => {
        this.categories = res.data.data
        this.addSEORelatedTags()
      }, (res) => {
        console.log(res.data)
      })
    
    this.carousel.done.subscribe(() => {
      window.scrollTo(0, 0)
      this.loadingScreen.hideSpinner()
    })

    this.titleService.setTitle(GlobalConfig.BLOG_TITLE)
  }

  addSEORelatedTags(): void {
    this.metaService.addTags([
      {name: 'og:title', content: GlobalConfig.BLOG_TITLE},
      {name: 'og:description', content: GlobalConfig.BLOG_DESCRIPTION},
      {name: 'og:image', content: GlobalConfig.BLOG_FEATURE_IMAGE_URL},
      {name: 'fb:app_id', content: GlobalConfig.FACEBOOK_APP_ID},
      {name: 'og:type', content: 'website'}
    ])
  }
}
