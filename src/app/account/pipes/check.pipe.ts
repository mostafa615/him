import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'check'
})
export class CheckPipe implements PipeTransform {

  transform(cpmpanies:any[] , company_id:any): any {
    console.log(company_id);
    
    if (company_id == 'الكل' || company_id == '' || company_id == null || company_id == undefined || company_id == '0' || cpmpanies == [] || cpmpanies == undefined || cpmpanies == null) {
      return cpmpanies;
    } else{
      return cpmpanies.filter((cpmpanies: any) =>{
        return cpmpanies.company_id == company_id
      })
    }
  }
   
  }


