import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../../models/author';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import html from '../../../configs/blog-description.html';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loading: LoadingScreenComponent
  private blogDescription: string = html;
  private authors: Author[]

  constructor(
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    ButterService.author.list()
      .then((res) => {
        this.authors = res.data.data
        this.loading.hideSpinner()
        this.title.setTitle('About')
      }, (res) => {
        console.log(res.data)
        this.router.navigateByUrl('/404')
      })
  }
}
