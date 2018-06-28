import { Directive, ElementRef, Renderer2, OnDestroy, Input, Output, EventEmitter, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HighlightJS, HighlightResult } from 'ngx-highlightjs';
import { from } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[highlightSSR]'
})
export class HighlightSsrDirective implements OnInit, OnDestroy {

  el: HTMLElement;
  domObs: MutationObserver;
  code: string;
  hljs: HighlightJS;

  @Input() highlightSSR: string;
  @Input() language: string[];
  @Input('code')
  set setCode(code: string) {
    this.code = code;
    this.hljs.isReady.subscribe(() => this.highlightElement(this.el, code));
  }

  @Output() highlighted = new EventEmitter<HighlightResult>();

  private isBrowser: boolean

  constructor(
    el: ElementRef, 
    private renderer: Renderer2, 
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.el = el.nativeElement;
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.hljs = new HighlightJS({
        theme: 'atom-one-dark',
        path: 'assets/js'
      })
    }
  }

  ngOnInit() {

    /** Acitvate MutationObserver if `auto` option is true and `[code]` input is not used
     * This will highlight using the text content */
    if (this.isBrowser){
      if (!this.code && this.hljs.options.auto) {

        this.hljs.isReady.subscribe(() => {
          this.highlightTextContent();

          /** Highlight when text content changes */
          this.domObs = new MutationObserver(() => this.highlightTextContent());
          this.domObs.observe(this.el, { childList: true, subtree: true });
        });
      }
    }
  }

  /** Highlight using element text content */
  highlightTextContent() {
    if (!this.highlightSSR) {
      if (this.el.tagName.toLowerCase() === 'code') {
        this.highlightElement(this.el, this.el.innerText.trim());
      } else {
        console.warn(`[HighlightDirective]: Use 'highlight' on <code> element only`);
      }
    } else if (this.highlightSSR === 'all') {
      this.highlightChildren(this.el, 'pre code');
    } else {
      this.highlightChildren(this.el, this.highlightSSR);
    }
  }

  /** Highlight a code block */
  highlightElement(el: HTMLElement, code: string) {

    const res: HighlightResult = this.hljs.highlightAuto(code, this.language);
    if (res.value !== el.innerHTML) {
      this.renderer.addClass(el, 'hljs');
      this.renderer.setProperty(el, 'innerHTML', res.value);
      this.highlighted.emit(res);
    }
  }

  /** Highlight multiple code blocks */
  highlightChildren(el: HTMLElement, selector: string) {

    const codeElements = el.querySelectorAll(selector);

    /** highlight children with the same selector */
    from(codeElements).pipe(
      filter((code: HTMLElement) => code.childNodes.length === 1 && code.childNodes[0].nodeName === '#text'),
      map((codeElement: HTMLElement) => this.highlightElement(codeElement, codeElement.innerText.trim())),
      take(1)
    ).subscribe();
  }

  ngOnDestroy() {
    /** Disconnect MutationObserver */
    if (this.isBrowser && !this.code && this.hljs.options.auto) {
      this.domObs.disconnect();
    }
  }
}
