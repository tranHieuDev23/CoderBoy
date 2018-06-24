import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractUrl'
})
export class ExtractUrlPipe implements PipeTransform {

  transform(value: string): any {
    let arr = value.split('/')
    return arr[arr.length - 1]
  }
}
