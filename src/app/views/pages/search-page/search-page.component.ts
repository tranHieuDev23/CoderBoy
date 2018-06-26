import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { Post } from '../../../models/post';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { GlobalConfig } from "../../../configs/global-config";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  public posts: Post[]
  public query: string

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.initView(params)
    })
  }

  initView(params: any) {
    window.scrollTo(0, 0)
    this.titleService.setTitle("Tìm kiếm")
    this.query = params['query']
    if (!this.query)
      this.loadingScreen.hideSpinner()
    else
    {
      this.loadingScreen.showSpinner()
      ButterService.post.search(this.query, {
        page: 1,
        page_size: GlobalConfig.SEARCH_MAXIMUM_RESULTS
      })
      .then((res) => {
        this.posts = res.data.data
        this.loadingScreen.hideSpinner()
      }, (res) => {
        console.log(res.data)
      })
    }
  }

  performSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query
      }
    })
  }
}
