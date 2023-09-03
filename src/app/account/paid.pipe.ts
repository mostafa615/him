import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paid'
})
export class PaidPipe implements PipeTransform {

  transform(arr: any): any {
    return arr.filter((arr: any) =>{
      return arr.paid == 0;
    })
  }

}
