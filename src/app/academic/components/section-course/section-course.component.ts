import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';
import { TermService } from 'src/app/account/services/term.service';
import { CourseService } from '../../services/course.service';
import { DivisionService } from 'src/app/account/services/division.service';

@Component({
  selector: 'app-section-course',
  templateUrl: './section-course.component.html',
  styleUrls: ['./section-course.component.scss']
})
export class SectionCourseComponent implements OnInit {

  filter: any = {};
  level_id_filter: any;
  filter_search: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  divisions: any = [];
  doc: any = document;
  section: any;
  prevsections: any;
  currentsectionName: any;
  currentsectionId: any;
  courses: any = [];
  course_id:any;
  division_id: any;
  term_id: any;
  terms: any = [];
  level_id: any;
  levels: any = [];
  groups: any = [];
  isSubmitted: any;
  student_number: any;
  student_number_search: any;
  curent_term: any;
  constructor(
    private courseService: CourseService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService ,
    private termService:TermService ) {
    this.applicationSettingService.queueRequests();
    var self = this;
    Request.fire(false, () => {
    });
    this.courses = this.courseService.getopenCourses().subscribe((res: any) => {
      this.courses = res;
    })
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.applicationSettingService.groups().subscribe((res: any) => {
      this.groups = res;
    })
    // this.courses = this.courseService.get().subscribe((res: any) => {
    //   this.courses = res;
    // })
  }

  load() {
    if (!Helper.validator(this.filter_search, ['division_id' , 'level_id' , 'term_id' , 'year_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    }
    this.applicationSettingService.sections(this.filter_search).subscribe((res: any) => {
      this.prevsections = res;
    })
  }

  createsection() {
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academicYear_id' , 'term_id' , 'group_id' , 'number'])) {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));

    } else {
      this.applicationSettingService.sectionStore(this.filter).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();

          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber1').trigger('click');
            this.section = '';


          }, 1000);
          this.filter_search, ['division_id' , 'level_id']
          this.filter_search.division_id = this.filter.division_id;
          this.filter_search.level_id = this.filter.level_id;

          // this.load();

          return Message.success(Helper.trans('done'));
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          setTimeout(() => {
            $('#alertNumber').slideUp(1000);
          }, 1000);
          return Message.error(Helper.trans('failed'));

        }
      })
    }
  }
  setCurrent(name: any, id: any) {
    this.currentsectionName = name;
    this.currentsectionId = id;
  }
  updatesection(name, id) {
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = { std_num: this.section, id: this.currentsectionId };
    if (this.section == undefined || this.currentsectionId == undefined || this.section == null || this.currentsectionId == null || this.section == '' || this.currentsectionId == '') {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));

    } else {
      this.applicationSettingService.sectionEdit(objectSend).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();

          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber2').trigger('click');
            this.section = '';


          }, 1000);
          this.load();

          return Message.success(Helper.trans('done'));
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          setTimeout(() => {
            $('#alertNumber').slideUp(1000);
          }, 1000);
          return Message.error(Helper.trans('failed'));

        }
      })
    }
  }
  destroysection(id) {
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.sectionDestroy(id).subscribe((res: any) => {
        if (res == 1) {
          this.load();
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error(Helper.trans('failed'));

        }
      })

    });

  }
  printContent() {
    this.doc.printJs();
  }
  getStudentNumber_search(division_id: any , level_id: any) {
    var data: any = {};
    data.division_id = division_id;
    data.level_id = level_id;
    if (!Helper.validator(data, ['level_id', 'division_id'])) {

    } else {
      this.applicationSettingService.getStudentNumber(data).subscribe((res: any) => {
        this.student_number_search = res.students_num;
        this.curent_term = res.term;
      })
    }

  }
  getStudentNumber(division_id: any , level_id: any) {
    var data: any = {};
    data.division_id = division_id;
    data.level_id = level_id;
    if (!Helper.validator(data, ['level_id', 'division_id'])) {

    } else {
      this.applicationSettingService.getStudentNumber(data).subscribe((res: any) => {
        this.student_number = res.students_num;
        this.curent_term = res.term;
      })
    }

  }

  ngOnInit() {
    // this.globalService.loadHtml("affair/report6", this.filter).subscribe((res) => {
    //   $('#reportContent').html(res);
    // });
    $('#division_id_search').on('change' , ()=>{
      this.division_id = $('#division_id_search').val();
    })
    $('#level_id_search').on('change' , ()=>{
      this.level_id = $('#level_id_search').val();
    })
    $('#level_id').on('change' , ()=>{
      this.level_id_filter = $('#level_id').val();
    })
    $('#term_id').on('change' , ()=>{
      this.term_id = $('#term_id').val();
    })
    // this.courseService.get().subscribe((res)=>{
    //   this.courses = res;
    // })
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
  }
}
