import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], searchText: string, filterProps?: any) {
    if(!value) {
      return null;
    }
    if(!searchText) {
      return value;
    }

    searchText = searchText.toLowerCase();
    return value.filter((item)=>{
      if(filterProps){
      return (item[filterProps] as String).toLowerCase().includes(searchText)
      } else {
        return JSON.stringify(item).toLowerCase().includes(searchText);
      }
    });
  }

}
