import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twitterHandleUrl'
})
export class TwitterHandleUrlPipe implements PipeTransform {

  transform(value: string): string {
    return `https://twitter.com/${value.slice(1)}`
  }
}
