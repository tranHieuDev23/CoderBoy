import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../models/post';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import GlobalConfig from '../../../configs/global-config.json';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  private posts: Post[]
  private title: string
  private currentPage: number
  private lastPage: number
  private baseUrl: string

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
    this.currentPage = (params['page'] != null? +params['page'] : 1)
    this.baseUrl = `/archive/${type}/${slug}`

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
      page: this.currentPage,
      page_size: GlobalConfig.ARCHIVE_PAGE_SIZE
    }
    if (type == 'category')
      REQUEST_PARAMS.category_slug = slug
    if (type == 'tag')
      REQUEST_PARAMS.tag_slug = slug
    ButterService.post.list(REQUEST_PARAMS)
      .then((res) => {
        this.posts = res.data.data
        this.lastPage = Math.floor(
          (res.data.meta.count + GlobalConfig.ARCHIVE_PAGE_SIZE - 1) 
          / GlobalConfig.ARCHIVE_PAGE_SIZE
        )
        this.loadingScreen.hideSpinner()
        console.log(this.lastPage)
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
