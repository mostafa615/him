import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AcademicYearService } from 'src/app/account/services/academic-year.service';
import { DivisionService } from 'src/app/account/services/division.service';
import { LevelService } from 'src/app/account/services/level.service';
import { TermService } from 'src/app/account/services/term.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-students-manage-report',
  templateUrl: './students-manage-report.component.html',
  styleUrls: ['./students-manage-report.component.scss']
})
export class StudentsManageReportComponent implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  courses: any = [];
  groups: any = [];
  sections: any = [];
  academicYears: any = [];
  filter_search:any = {};
  doc: any = document;
  terms: any = [];
  data:any = [];
  level_id:any;
  division_id:any;
  course_id:any;
  section_id:any;
  group_id:any;

  constructor(
    private courseService: CourseService,
    private academicService: AcademicYearService,
    private termService:TermService,
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.groups = this.applicationSettingService.groups().subscribe((res: any) => {
        this.groups = res;
      })

      this.courses = this.courseService.get().subscribe((res: any) => {
        this.courses = res;
      })
    this.titleService.setTitle("HIM"+ " - " + Helper.trans('students manage report'))
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });

}

loadSections() {
  if (!Helper.validator(this.filter, ['division_id' , 'level_id','course_id'])) {
  }else{
    this.applicationSettingService.sections(this.filter).subscribe((res: any) => {
      this.sections = res;
    })
  }

}
// ['level_id', 'course_id' ,'division_id' ,' group_id', 'section_id' , 'term_id' ,'year_id' ]
load() {
  console.log(this.filter);

  if (!Helper.validator(this.filter, ['level_id','course_id','division_id'])) {
    return Message.error(Helper.trans('please choose all filters'));
  }else{
    this.globalService.loadHtml("affair/report17", this.filter).subscribe((res) => {
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
    $('#level_id').on('change',()=>{
      this.level_id = $('#level_id').val();
    })
    $('#division_id').on('change',()=>{
      this.division_id = $('#division_id').val();
    })
    $('#group_id').on('change',()=>{
      this.group_id = $('#group_id').val();
    })

    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
  }

}
