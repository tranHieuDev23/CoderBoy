import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../../models/author';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent) loading: LoadingScreenComponent
  private authors: Author[]

  constructor() { }

  ngOnInit() {
    ButterService.author.list()
      .then((res) => {
        this.authors = res.data.data
        this.loading.hideSpinner()
      }, (res) => {
        console.log(res.data)
      })
  }
}
