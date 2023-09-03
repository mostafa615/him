import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levels'
})
export class LevelsPipe implements PipeTransform {

  transform(arr: any, code: any): any {
    if ( code == '' || code == null || code == undefined || code == '0' || arr == [] || arr == undefined || arr == null) {
      return arr;
    } else{
      return arr.filter((arr: any) =>{
        return arr.level_id == code
      })
    }
  }

}
