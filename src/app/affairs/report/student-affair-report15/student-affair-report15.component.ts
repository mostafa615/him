import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { TermService } from 'src/app/account/services/term.service';
@Component({
  selector: 'app-student-affair-report15',
  templateUrl: './student-affair-report15.component.html',
  styleUrls: ['./student-affair-report15.component.scss']
})
export class StudentAffairReport15Component implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  commissions: any;
  terms: any = [];

  constructor(
    private globalService: GlobalService,
    private termService:TermService,
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });


    }

  load() {
    if (!Helper.validator(this.filter, ['level_id', 'academic_year_id' , 'term_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    }

    this.globalService.loadHtml("affair/report15", this.filter).subscribe((res) => {
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
  excel(){}

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
  }
}
