import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-tag-list-item',
  templateUrl: './tag-list-item.component.html',
  styleUrls: ['./tag-list-item.component.scss']
})
export class TagListItemComponent implements OnInit {
  @Input() tag: Tag;

  constructor() { }

  ngOnInit() {
  }
}
