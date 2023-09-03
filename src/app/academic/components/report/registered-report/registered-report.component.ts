import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Helper } from 'src/app/shared/helper';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Message } from 'src/app/shared/message';
import { Cache } from 'src/app/shared/cache';
import { DivisionService } from 'src/app/account/services/division.service';
import { TermService } from 'src/app/account/services/term.service';

@Component({
  selector: 'app-registered-report',
  templateUrl: './registered-report.component.html',
  styleUrls: ['./registered-report.component.scss']
})
export class RegisteredReportComponent implements OnInit {


  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  terms: any = [];

  constructor(
    private termService:TermService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });

}

load() {
  if (!Helper.validator(this.filter, ['level_id', 'division_id', 'term_id','isregistered'])) {
    return Message.error(Helper.trans('please choose all filters'));
  }

  this.globalService.loadHtml("affair/report13", this.filter).subscribe((res) => {
    $('#reportContent').html(res);
    this.calculateCount();

  });
}
excel() {
  this.doc.exportExcel();
}
calculateCount() {
  this.$('#count').text(this.$('#reportContent tbody tr').length);
}
printContent() {
  this.doc.printJs();
}
  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);

  }

}
