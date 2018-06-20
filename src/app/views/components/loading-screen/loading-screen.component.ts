import { Component, OnInit, ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
  @ViewChild('loading') loading: ElementRef;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  public showSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.loading.nativeElement, 'hide')
    })
  }

  public hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.addClass(this.loading.nativeElement, 'hide')
    })
  }
}
