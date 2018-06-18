import { Component, OnInit } from '@angular/core';
import GlobalConfig from '../../../configs/global-config.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private BLOG_TITLE = GlobalConfig.BLOG_TITLE;
  private CREDIT = GlobalConfig.CREDIT;

  constructor() { }

  ngOnInit() {
  }

}
