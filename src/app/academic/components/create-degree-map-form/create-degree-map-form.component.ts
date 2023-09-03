import { Component, Input, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { DegreeMapService } from '../../services/degree-map.service';

@Component({
  selector: 'app-create-degree-map-form',
  templateUrl: './create-degree-map-form.component.html',
  styleUrls: ['./create-degree-map-form.component.scss']
})
export class CreateDegreeMapFormComponent implements OnInit {

  @Input() degreeMap: any = {};
  @Input() updateView: any;

  isSubmitted = false;
  requiredFields = [
    'percent_from',
    'percent_to',
    'key',
    'gpa',
    'name'
  ];

  constructor(private degreeMapService: DegreeMapService) { }

  ngOnInit() {
  }

  validate() {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!this.degreeMap[element])
        valid = false;
    });
    return valid;
  }

  send() {
    if (!this.validate()) {
      return Message.error(Helper.trans('fill all required data'));
    }
    if (this.degreeMap.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.isSubmitted= true;
    this.degreeMapService.store(this.degreeMap).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      }
      else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
      this.updateView();
    });
  }

  update() {
    this.isSubmitted= true;
    this.degreeMapService.update(this.degreeMap).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      }
      else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
      this.updateView();
    });
  }

}
