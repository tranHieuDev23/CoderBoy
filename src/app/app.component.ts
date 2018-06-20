import { Component, ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';
import globalConfig from './configs/global-config.json'
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('loading') loading: ElementRef;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  showSpinner() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.loading.nativeElement, 'hide')
    })
  }

  hideSpinner() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.addClass(this.loading.nativeElement, 'hide')
    })
  }

  navigationInterceptor(event: RouterEvent) {
    if (event instanceof NavigationStart)
      this.showSpinner()
    if (event instanceof NavigationEnd)
      this.hideSpinner()
    if (event instanceof NavigationError)
      this.hideSpinner()
    if (event instanceof NavigationCancel)
      this.hideSpinner()
  }
}
