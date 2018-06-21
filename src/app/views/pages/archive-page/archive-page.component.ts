import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../models/post';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  private posts: Post[]
  private title: string

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) =>{
      this.initView(params)
    })
  }

  initView(params: any) {
    let type = params['type']
    if (type != 'category' && type != 'tag') {
      this.router.navigateByUrl('/404')
      return
    }
    let slug = params['slug']
    let page = (params['page'] != null? +params['page'] : 1)

    window.scrollTo(0, 0)
    this.loadingScreen.showSpinner()

    ButterService[type].retrieve(slug)
    .then((res) => {
      this.title = `${this.generateTitle(type)} ${res.data.data.name}`
      this.titleService.setTitle(res.data.data.name)
    }, (res) => {
      console.log(res.data)
    })

    const REQUEST_PARAMS: any = {
      page: page,
      page_size: 10
    }
    if (type == 'category')
      REQUEST_PARAMS.category_slug = slug
    if (type == 'tag')
      REQUEST_PARAMS.tag_slug = slug
    ButterService.post.list(REQUEST_PARAMS)
      .then((res) => {
        this.posts = res.data.data
        this.loadingScreen.hideSpinner()
      }, (res) => {
        console.log(res.data);
        this.router.navigateByUrl('/404')
      })
  }

  generateTitle(type: string): string {
    if (type == 'category')
      return 'Bài viết thuộc chủ đề'
    if (type == 'tag')
      return 'Bài viết gắn tag'
  }
}
