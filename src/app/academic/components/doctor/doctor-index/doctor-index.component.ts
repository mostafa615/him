import { Component, OnInit } from '@angular/core';
import { idLocale } from 'ngx-bootstrap';
import { DoctorService } from 'src/app/academic/services/doctor.service';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-doctor-index',
  templateUrl: './doctor-index.component.html',
  styleUrls: ['./doctor-index.component.scss']
})
export class DoctorIndexComponent implements OnInit {

  doctors: any = [];
  doctor: any = {};
  updateView: any = null;
  $: any = $;

  constructor(private doctorService: DoctorService) {
    this.updateView = () => {
      this.loadDoctors();
    };
  }

  ngOnInit() {
    this.loadDoctors();
  }

  showUpdateDoctorForm(doctor) {
    this.doctor = doctor;
    console.log(doctor.levels);
    // set select2
    setTimeout(() => {
      this.$('.level-select').val(doctor.levels);
      this.$('.level-select').select2();
    }, 500);
    this.$('#doctorFormModal').modal('show');
  }

  showAddForm() {
    this.doctor = {};
    // set select2
    setTimeout(() => {
      this.$('.level-select').select2();
    }, 500);
    this.$('#doctorFormModal').modal('show');
  }

  performRemove(doctor, index) {
    this.doctorService.destroy(doctor.id).subscribe((res: any)=>{
      if (res.status == 1) {
        Message.success(res.message);
        this.doctors.splice(index, index+1);
      } else {
        Message.error(res.message);
      }
    });
  }

  remove(doctor, index) {
    var self = this;
    Message.confirm(Helper.trans('are you sure'), ()=>{
      self.performRemove(doctor, index);
    });
  }

  loadDoctors() {
    this.doctorService.get().subscribe((res)=>{
      this.doctors = res;
    });
  }
}
