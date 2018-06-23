import { Component, OnInit, ElementRef, ViewChild, Renderer2, NgZone } from '@angular/core';
import { Category } from '../../../models/category';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import GlobalConfig from '../../../configs/global-config.json';
import { ScrollEvent } from 'ngx-scroll-event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @ViewChild('topBar') topBar: ElementRef;
  @ViewChild('sideBar') sideBar: ElementRef;
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('dropdown') dropdown: ElementRef;
  private BLOG_TITLE = GlobalConfig.BLOG_TITLE;
  private categories: Category[];
  private query: string;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    ButterService.category.list()
      .then((res) => {
        this.categories = res.data.data;
      }, (res) => {
        console.log(res.data);
      })
  }

  public openSideBar(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.addClass(this.sideBar.nativeElement, 'open')
      this.renderer.addClass(this.overlay.nativeElement, 'active')
    })
  }

  public closeSideBar(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.sideBar.nativeElement, 'open')
      this.renderer.removeClass(this.overlay.nativeElement, 'active')
    })
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

  public disableTransparentTopbar(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.addClass(this.topBar.nativeElement, 'disable-transparent')
    })
  }
  public enableTransparentTopbar(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.topBar.nativeElement, 'disable-transparent')
    })
  }

  performSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query
      }
    })
    this.query = null
    this.dropdown.nativeElement.dropdown()
  }
}
