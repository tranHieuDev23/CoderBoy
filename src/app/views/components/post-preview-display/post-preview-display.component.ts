import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-post-preview-display',
  templateUrl: './post-preview-display.component.html',
  styleUrls: ['./post-preview-display.component.scss']
})
export class PostPreviewDisplayComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }
}
