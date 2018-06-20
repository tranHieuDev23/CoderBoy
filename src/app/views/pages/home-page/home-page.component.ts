import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Category } from '../../../models/category';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import GlobalConfig from "../../../configs/global-config.json";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private posts: Post[]
  private categories: Category[]

  constructor(
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    ButterService.category.list()
      .then((res) => {
        this.categories = res.data.data
      }, (res) => {
        console.log(res.data)
      })

    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    this.titleService.setTitle(GlobalConfig.BLOG_TITLE)
  }

}
