import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'person'
})
export class PersonPipe implements PipeTransform {

  transform(persons:any[] , person_id:any): any {
    console.log(person_id);
    
    if (person_id == 'الكل' || person_id == '' || person_id == null || person_id == undefined || person_id == '0' || persons == [] || persons == undefined || persons == null) {
      return persons;
    } else{
      return persons.filter((persons: any) =>{
        return persons.person_id == person_id
      })
    }
  }

}
