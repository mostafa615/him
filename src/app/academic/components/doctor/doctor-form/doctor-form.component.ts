import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/academic/services/doctor.service';
import { LevelService } from 'src/app/account/services/level.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

  $: any = $;

  @Input() doctor: any;
  @Input() updateView: any;

  levels: any = [];
  isSubmitted = false;
  requiredFields = [
    'name',
    'phone',
    'username',
    'password',
  ];
  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    // set select2
    setTimeout(() => {
      this.$('.level-select').select2();
    }, 500);
    // load levels
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

  validate() {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!this.doctor[element])
        valid = false;
    });
    return valid;
  }

  send() {
    if (!this.validate()) {
      return Message.error(Helper.trans('fill all required data'));
    }

    this.doctor.levels = this.$('.level-select').val();
    if (this.doctor.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.isSubmitted= true;

    this.doctorService.store(this.doctor).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.doctor = {};
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
    this.doctorService.update(this.doctor).subscribe((res: any) => {
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
