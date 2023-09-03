import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/academic/services/course.service';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { TermService } from 'src/app/account/services/term.service';
import { DivisionService } from 'src/app/account/services/division.service';
@Component({
  selector: 'app-student-affair-report4',
  templateUrl: './student-affair-report4.component.html',
  styleUrls: ['./student-affair-report4.component.scss']
})
export class StudentAffairReport4Component implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  commissions: any;
  groups:any = [];
  sections:any = [];
  section_id:any;
  level_id:any;
  levels: any = [];
  course_id:any;
  courses:any = [];
  division_id:any;
  group_id:any;
  currentTerm: any = {};
  terms: any = [];
  term_id:any;

  constructor(
    private courseService:CourseService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService, private systemSetting: SystemSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });
 this.courses = this.courseService.get().subscribe((res: any) => {
        this.courses = res;
      })

    }

  load() {
    if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academic_year_id','course_id','group_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    }

    this.globalService.loadHtml("affair/report4", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
      
    });
  }

  loadSections() {
      this.applicationSettingService.sections(this.filter).subscribe((res: any) => {
        this.sections = res;
      })

  }

  printContent() {
    this.doc.printJs();
  }
  excel() {
    this.doc.exportExcel();
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
    $('#section_id').on('change',()=>{
      this.section_id= $('#section_id').val();
    })
    $('#term_id').on('change' , ()=>{
      this.term_id = $('#term_id').val();
    })
    this.applicationSettingService.groups().subscribe((res)=>{
      this.groups = res;
    })
    this.courseService.get().subscribe((res)=>{
      this.courses = res;
    })
    this.systemSetting.getSystemSetting().subscribe((res: any)=>{
      this.currentTerm = res['current_term'];
    });
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX); 
   }
}
