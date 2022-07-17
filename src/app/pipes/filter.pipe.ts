import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure : false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, //Project[], any for receiving any type of array 
  searchBy: string, searchText: string): any {
   if (value == null) {
      return null;
   } 
   let resultArray = [];
   console.log(value);

   for (let item of value)
    {   
      //converted to lower case to make it case insensitive

      if (String(item[searchBy]).toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      {
        resultArray.push(item);
      }
    }
   //will be renderd in DOM
   return resultArray;
  }

}
