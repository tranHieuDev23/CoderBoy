import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalConfig } from '../../../configs/global-config';
import html from '../../../configs/footer-content.html';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public title = GlobalConfig.BLOG_TITLE;
  public content = html;

  constructor() { }

  ngOnInit() {
  }

}
