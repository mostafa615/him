import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-add-seating-numbers',
  templateUrl: './add-seating-numbers.component.html',
  styleUrls: ['./add-seating-numbers.component.scss']
})
export class AddSeatingNumbers implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  start_number: any;
  level_id: any;
  division_id: any;

  constructor(private globalService: GlobalService, private applicationSettingService: ApplicationSettingService) { }
  calculateCount() {
    this.$('#count').text(this.$('#reportContent tbody tr').length);
  }

  load() {
    //if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academic_year_id'])) {
    //  return Message.error(Helper.trans('please choose all filters'));
    //}

    this.globalService.loadHtml("affair/report3", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
      this.calculateCount();
    });
  }

  sendNumber() {
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = { level_id: this.level_id, start_number: this.start_number , division_id: this.division_id };
    console.log(objectSend)
    if (this.level_id == undefined || this.start_number == undefined || this.division_id == undefined) {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
    } else {
      this.applicationSettingService.makeNumber(objectSend).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber').trigger('click');
            this.level_id = '';
            this.start_number = '';
            this.division_id = '';

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

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);

  }

}
