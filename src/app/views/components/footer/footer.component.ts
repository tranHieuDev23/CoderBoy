import { Component, OnInit } from '@angular/core';
import GlobalConfig from '../../../configs/global-config.json';
import html from '../../../configs/footer-content.html';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private title = GlobalConfig.BLOG_TITLE;
  private content = html;

  constructor() { }

  ngOnInit() {
  }

}
