import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectvalues'
})
export class ObjectValuesPipe implements PipeTransform {

    
    transform(value: any, args: any[] = null): any {
        console.log(value);
        
        return Object.keys(value);
      }
   
  }


