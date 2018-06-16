import { Component } from '@angular/core';
import globalConfig from './configs/global-config.json'
import { ButterService } from "./controllers/butterCMS/butter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = globalConfig.BUTTERCMS_API_TOKEN
  public posts: any[]

  ngOnInit() {
    console.log(this.title);

    ButterService.post.list({
      page: 1,
      page_size: 10
    })
    .then((res) => {
      console.log('Content from ButterCMS')
      console.log(res.data)
      this.posts = res.data.data
    })
  }
}
