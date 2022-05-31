import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Project[], searchBy: string, searchText: string): any {
   if (value == null) {
      return null;
   } 
   let resultArray = [];
   console.log(value);

   for (let item of value)
    {   
      console.log(String(item[searchBy]).toLowerCase());
      
      console.log(String(item[searchBy]).toLowerCase().indexOf(searchText.toLowerCase()))


      if (String(item[searchBy]).toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      {
        resultArray.push(item);
      }
    }
   //will be renderd in DOM
   return resultArray;
  }

}
