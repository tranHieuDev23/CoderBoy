import { Component, OnInit, ElementRef, ViewChild, Renderer2, NgZone, HostListener } from '@angular/core';
import { Category } from '../../../models/category';
import { ButterService } from '../../../controllers/butterCMS/butter.service';
import { GlobalConfig } from '../../../configs/global-config';
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
  @ViewChild('dropdownToggle') dropdownToggle: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
  public BLOG_TITLE = GlobalConfig.BLOG_TITLE;
  public categories: Category[];
  public query: string;

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

  @HostListener('window:scroll', [])
  public handleScroll() {
    if (window.scrollY <= 1) 
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

  closeSearchDropdown(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.dropdown.nativeElement, 'show')
      this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show')
      this.renderer.setProperty(this.dropdownToggle.nativeElement, 'aria-expanded', false)
    })
  }

  performSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query
      }
    })
    this.query = null
    this.closeSearchDropdown();
  }
}
