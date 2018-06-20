import { Component, OnInit, ElementRef, ViewChild, Renderer2, NgZone } from '@angular/core';
import { Category } from '../../../models/category';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import GlobalConfig from '../../../configs/global-config.json';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @ViewChild('topBar') topBar: ElementRef;
  @ViewChild('sideBar') sideBar: ElementRef;
  @ViewChild('overlay') overlay: ElementRef;
  private BLOG_TITLE = GlobalConfig.BLOG_TITLE;
  private categories: Category[];
  private opened: boolean = false;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    ButterService.category.list()
      .then((res) => {
        this.categories = res.data.data;
      }, (res) => {
        console.log(res.data);
      })
  }

  toggleSidebar(): void {
    if (!this.opened) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.addClass(this.sideBar.nativeElement, 'open')
        this.renderer.addClass(this.overlay.nativeElement, 'active')
        this.opened = true;
      })
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.removeClass(this.sideBar.nativeElement, 'open')
        this.renderer.removeClass(this.overlay.nativeElement, 'active')
        this.opened = false;
      })
    }
  }

  public handleScroll(event: ScrollEvent) {
    if (event.isReachingTop) 
      this.ngZone.runOutsideAngular(() => {
        this.renderer.addClass(this.topBar.nativeElement, 'transparent')
      })
    else
      this.ngZone.runOutsideAngular(() => {
        this.renderer.removeClass(this.topBar.nativeElement, 'transparent')
      })
  }
}
