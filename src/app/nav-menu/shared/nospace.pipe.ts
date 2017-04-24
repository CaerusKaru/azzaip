import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nospace'
})
export class NospacePipe implements PipeTransform {

  transform(value: string): string {
    return (!value) ? '' : value.replace(/ /g, '');
  }

}
