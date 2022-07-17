import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
//sortBy - > repreents column name on which the sorting should be applied
//sortOrder : represents the order desc and asc
  transform(value: any[], sortBy: string, sortOrder: string): any {
    if (value ==  null)
       return null;
    value.sort(function(a,b){
      //less than 0: a > b
      //greater than 0: b>a
      //eualt to zero :  a & b are left unchanged
      if(a[sortBy] && b[sortBy])
      {
        return a[sortBy].toString().toLowerCase()[0] -  b[sortBy].toString().toLowerCase()[0];
        // a = cat ->99 // b =dog ->100
        //99-100 = -1 <0 so a>b a will come first
  
      }
      else{
        return 0;
      }

    });
    if(sortOrder == "DESC"){
      value.reverse();
    }
    return value;
  }

}
