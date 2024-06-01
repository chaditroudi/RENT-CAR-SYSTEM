import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], query: string, columns: string[]): any[] {
    if (!query) {
      return list;
    }
    
    return list.filter(item => {
      return columns.some(column => {
        return item[column].toString().toLowerCase().includes(query.toLowerCase());
      });
    });
  }
}