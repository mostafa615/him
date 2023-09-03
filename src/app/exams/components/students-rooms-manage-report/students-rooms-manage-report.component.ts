import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DivisionService } from 'src/app/account/services/division.service';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-students-rooms-manage-report',
  templateUrl: './students-rooms-manage-report.component.html',
  styleUrls: ['./students-rooms-manage-report.component.scss']
})
export class StudentsRoomsManageReportComponent implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  filter_search:any = {};
  doc: any = document;
  commissions:any = [];

  constructor(
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
    this.titleService.setTitle("HIM"+ " - " + Helper.trans('students_rooms_manage_report'))
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });

}

load() {
  if (!Helper.validator(this.filter, ['level_id','division_id','distributed'])) {
    return Message.error(Helper.trans('please choose all filters'));
  }else{
    this.globalService.loadHtml("affair/report19", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
    });
  }


}

excel() {
  this.doc.exportExcel();
}

printContent() {
  this.doc.printJs();
}
  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.applicationSettingService.commissions().subscribe((res)=>{
      this.commissions = res;
    })
  }

}
