import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(installment_details:any[] , installment_id:any): any {
    console.log(installment_id);
    
    
      return installment_details.filter((installment_details: any) =>{
        return installment_details.paid == 0
      })
    
  }

}
