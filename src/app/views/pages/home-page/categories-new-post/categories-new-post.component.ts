import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../../models/post';
import { Category } from '../../../../models/category';
import { ButterService } from '../../../../controllers/butterCMS/butter.service';

@Component({
  selector: 'app-categories-new-post',
  templateUrl: './categories-new-post.component.html',
  styleUrls: ['./categories-new-post.component.scss']
})
export class CategoriesNewPostComponent implements OnInit {

  @Input() category: Category
  public posts: Post[]

  constructor() { }

  ngOnInit() {
    ButterService.post.list({
      page: 1,
      page_size: 3,
      category_slug: this.category.slug,
      exclude_body: true
    }).then((res) => {
      this.posts = res.data.data
    }, (res) => {
      console.log(res.data)
    })
  }
}
