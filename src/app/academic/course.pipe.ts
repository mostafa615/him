import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'course'
})
export class CoursePipe implements PipeTransform {

  transform(arr: any, code: any): any {
    if ( code == '' || code == null || code == undefined || code == '0' || arr == [] || arr == undefined || arr == null) {
      return null;
    } else{
      return arr.filter((arr: any) =>{
        return arr.course_id == code
      })
    }
  }

}
