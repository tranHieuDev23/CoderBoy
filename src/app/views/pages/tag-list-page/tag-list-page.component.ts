import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-tag-list-page',
  templateUrl: './tag-list-page.component.html',
  styleUrls: ['./tag-list-page.component.scss']
})
export class TagListPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loadingScreen: LoadingScreenComponent;
  private tags: Tag[]

  constructor(
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit() {
    ButterService.tag.list()
      .then((res) => {
        this.tags = res.data.data
        this.titleService.setTitle('Danh mục tag trên trang')
        this.loadingScreen.hideSpinner()
      }, (res) => {
        console.log(res.data)
        this.router.navigateByUrl('/404')
      })
  }
}
