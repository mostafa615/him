import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AcademicYearService } from 'src/app/account/services/academic-year.service';
import { TermService } from 'src/app/account/services/term.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { CourseService } from '../../services/course.service';
import { LevelService } from 'src/app/account/services/level.service';
import { DivisionService } from 'src/app/account/services/division.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  courses: any = [];
  academicYears: any = [];
  filter_search:any = {};
  doc: any = document;
  terms: any = [];
  data:any = [];
  level_id:any;
  division_id:any;
  course_id:any;
  term_id:any;

  constructor(
    private courseService: CourseService,
    private academicService: AcademicYearService,
    private termService:TermService,
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.courses = this.courseService.get().subscribe((res: any) => {
        this.courses = res;
      })
    this.titleService.setTitle("HIM"+ " - " + Helper.trans('students manage report'))
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });

}

load() {
  console.log(this.filter);

  if (!Helper.validator(this.filter, ['term_id','course_id'])) {
    return Message.error(Helper.trans('please choose all filters'));
  }else{
    this.globalService.loadHtml("affair/get-result-absence", this.filter).subscribe((res) => {
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
    $('#term_id').on('change',()=>{
      this.term_id = $('#term_id').val();
    })
    $('#level_id').on('change',()=>{
      this.level_id = $('#level_id').val();
    })
    $('#division_id').on('change',()=>{
      this.division_id = $('#division_id').val();
    })
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
  }

}
