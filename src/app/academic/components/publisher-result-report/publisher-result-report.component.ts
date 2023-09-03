import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LevelService } from 'src/app/account/services/level.service';
import { DivisionService } from 'src/app/account/services/division.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { TermService } from 'src/app/account/services/term.service';
import { AcademicYearService } from 'src/app/account/services/academic-year.service';

@Component({
  selector: 'app-publisher-result-report',
  templateUrl: './publisher-result-report.component.html',
  styleUrls: ['./publisher-result-report.component.scss']
})
export class PublisherResultReportComponent implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  terms: any = [];
  Pages: any = [];

  constructor(
    private academicService: AcademicYearService,
    private termService:TermService,
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
    this.titleService.setTitle("HIM"+ " - " + Helper.trans('print result'))
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });

}
getPagsNumbers(){
  this.Pages = [];
  if(this.filter.level_id != null && this.filter.division_id != null && this.filter.term_id != null && this.filter.year_id != null ){
    this.globalService.getPagesNumbers(this.filter).subscribe((data)=>{
      this.Pages = [];
      for (var i = 1; i <= data; i++) {
        this.Pages.push(i);
    }
    })
  }
}

load() {
  if (!Helper.validator(this.filter, ['level_id' , 'division_id' , 'term_id' , 'year_id' ])) {
    return Message.error(Helper.trans('please choose all filters'));
  }

  this.globalService.loadHtml("affair/get-result-advertsment-show", this.filter).subscribe((res) => {
    $('#reportContent').html(res);
  });
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
    this.terms = Cache.get(TermService.TERPM_PREFIX);
  }

}
