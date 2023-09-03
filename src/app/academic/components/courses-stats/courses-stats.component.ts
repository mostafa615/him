import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
import { DegreeMapService } from '../../services/degree-map.service';
@Component({
  selector: 'app-courses-stats',
  templateUrl: './courses-stats.component.html',
  styleUrls: ['./courses-stats.component.scss']
})
export class CoursesStatsComponent implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  terms: any = [];
  level_id:any;
  division_id:any;
  term_id:any;
  courses: any = [];
  degreeMaps: any = [];

  constructor(
    private titleService: Title,
    private globalService: GlobalService,
    private courseService: CourseService,
    private degreeMapService: DegreeMapService,
    private applicationSettingService: ApplicationSettingService) {
    this.titleService.setTitle("HIM"+ " - " + Helper.trans('print result'))
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });
      this.courses = this.courseService.getopenCourses().subscribe((res: any) => {
        this.courses = res;
      })
      // this.courseService.get().subscribe((res: any) => {
      //   this.courses = res;
      // })
      this.degreeMapService.get().subscribe((res) => {
        this.degreeMaps = res;
      });

}

load() {
  if (!Helper.validator(this.filter, ['level_id' , 'division_id' , 'term_id' , 'year_id','degree_id'])) {
    return Message.error(Helper.trans('please choose all filters'));
  }

  this.globalService.loadHtml("affair/get-courses-statistics", this.filter).subscribe((res) => {
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
    $('#term_id').on('change',()=>{
      this.term_id = $('#term_id').val();
    })
    $('#level_id').on('change',()=>{
      this.level_id = $('#level_id').val();
    })
    $('#division_id').on('change',()=>{
      this.division_id = $('#division_id').val();
    })

  }

}
