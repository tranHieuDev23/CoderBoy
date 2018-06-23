import { Component, ViewChild } from '@angular/core';
import globalConfig from './configs/global-config.json'
import { TopBarComponent } from './views/components/top-bar/top-bar.component';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(TopBarComponent) topBar: TopBarComponent;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.handleRoutingEvents(event)
    })
  }

  routeAllowsTransparentTopbar(url: string): boolean {
    let homeRegExp = new RegExp('(\/home).*')
    let postRegExp = new RegExp('(\/post\/)[a-zA-Z0-9_-]+.*')
    return homeRegExp.test(url) || postRegExp.test(url)
  }

  handleRoutingEvents(event: RouterEvent): void {
    if (event instanceof NavigationEnd) {
      if (this.routeAllowsTransparentTopbar(event.urlAfterRedirects))
        this.topBar.enableTransparentTopbar();
      else
        this.topBar.disableTransparentTopbar();
    }
  }
}
