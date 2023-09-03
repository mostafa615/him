import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bank'
})
export class BankPipe implements PipeTransform {

  transform(arr: any, code: any): any 
  {
    if ( code == '' || code == null || code == undefined || code == '0' || arr == [] || arr == undefined || arr == null) {
      return arr;
    } else{
      return arr.filter((arr: any) =>{
        return arr.type_user_id == code
      })
    }
  }

}
