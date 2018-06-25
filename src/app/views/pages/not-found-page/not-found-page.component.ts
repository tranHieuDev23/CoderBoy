import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import GlobalConfig from '../../../configs/global-config.json';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  private message: string = GlobalConfig.MESSAGE_404
  private query: string

  constructor(
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0)
    this.titleService.setTitle("404 Not Found")
  }

  performSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query
      }
    })
  }
}
