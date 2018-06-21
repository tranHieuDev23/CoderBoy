import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number
  @Input() lastPage: number
  @Input() baseUrl: string

  constructor() { }

  ngOnInit() {
  }
}
