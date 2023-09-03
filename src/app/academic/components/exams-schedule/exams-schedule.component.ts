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
import { GlobalService } from 'src/app/shared/services/global.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-exams-schedule',
  templateUrl: './exams-schedule.component.html',
  styleUrls: ['./exams-schedule.component.scss']
})
export class ExamsScheduleComponent implements OnInit {

  filter: any = {};
  isSubmitted: any;
  filterUpdate: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  courses:any = [];
  terms:any = [];
  academicYears: any = [];
  doc: any = document;
  level_id:any;
  division_id:any;
  course_id:any;
  term_id:any;

  constructor(    private courseService: CourseService,
    private academicService: AcademicYearService,
    private termService:TermService,
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) { }

    updateExam(){
      if (!Helper.validator(this.filterUpdate, ['day' , 'date' , 'time'])) {
        return Message.error(Helper.trans('fill_all_required_data'));
      } else {
        $('#beforeLoading').hide();
        $('#buttonLoading').show();
        this.courseService.updateOpenCoursesExamSchedule(this.filterUpdate).subscribe((res) => {
          if (res == 1) {
            $('#alertNumberSuccess').slideDown(300);
            $('#beforeLoading0').show();
            $('#buttonLoading0').hide();
            this.courseService.getOpenCourses().subscribe((res: any) => {
              this.courses = res;
            })
            return Message.success(Helper.trans('done'));
          } else {
            $('#beforeLoading0').show();
            $('#buttonLoading0').hide();
            return Message.error(Helper.trans('failed'));
          }
        })
      }
    }


    setCurrent(course:any) {
      this.filterUpdate['course_id'] = course.id;
      this.filterUpdate['course_name'] = course.name;
      this.filterUpdate['course_day'] = course.day;
      this.filterUpdate['course_date'] = course.exam_date;
      this.filterUpdate['course_time'] = course.time;
    }

    destroyExam(data:any){

    }


  ngOnInit() {
    $('#level_id').on('change',()=>{
      this.level_id = $('#level_id').val();
    })
    $('#division_id').on('change',()=>{
      this.division_id = $('#division_id').val();
    })
    $('#term_id').on('change',()=>{
      this.term_id = $('#term_id').val();
    })

    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.courseService.getOpenCourses().subscribe((res: any) => {
      this.courses = res;
    })
  }

}
