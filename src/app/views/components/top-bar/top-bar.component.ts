import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { ButterService } from '../../../controllers/butterCMS/butter.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  private categories: Category[];
  private sideBar: HTMLElement;
  private overlay: HTMLElement;

  constructor() { }

  ngOnInit() {
    ButterService.category.list()
      .then((res) => {
        this.categories = res.data.data;
      }, (res) => {
        console.log(res.data);
      })
    
    this.sideBar = document.getElementById('sidebar')
    this.overlay = document.getElementById('overlay')
  }

  toggleSidebar(): void {
    this.sideBar.classList.toggle('open');
    this.overlay.classList.toggle('active');
  }
}
