import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';

@Component({
  selector: 'app-student-affair-report6',
  templateUrl: './student-affair-report6.component.html',
  styleUrls: ['./student-affair-report6.component.scss']
})
export class StudentAffairReport6Component implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  commissions: any;

  constructor(
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });


    }

  load() {
    if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academic_year_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    }

    this.globalService.loadHtml("affair/report4", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
    });
  }

  createCommissions(){
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = {name: this.commissions};
    console.log(objectSend)
    if(this.commissions == undefined || this.commissions == '' || this.commissions == null){
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
    } else {
      this.applicationSettingService.commissionsStore(objectSend).subscribe((res)=>{
        if(res == 1){
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumberSuccess').slideUp(1000);
        $('#closeNumber').trigger('click');
        this.commissions = '';

      }, 1000);
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
        }
      })
    }
  }

  printContent() {
    this.doc.printJs();
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }
}
