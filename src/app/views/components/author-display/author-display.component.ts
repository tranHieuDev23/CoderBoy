import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../../../models/author';

@Component({
  selector: 'app-author-display',
  templateUrl: './author-display.component.html',
  styleUrls: ['./author-display.component.scss']
})
export class AuthorDisplayComponent implements OnInit {
  @Input() author: Author;
  constructor() { }

  ngOnInit() {
  }
}
