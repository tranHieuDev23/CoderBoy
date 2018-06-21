import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(
    private satinizer: DomSanitizer
  ) {}

  transform(value: any): any {
    return this.satinizer.bypassSecurityTrustHtml(value)
  }
}
