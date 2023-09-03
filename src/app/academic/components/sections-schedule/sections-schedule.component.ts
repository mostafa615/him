import { Component, OnInit } from '@angular/core';
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
import { DoctorService } from 'src/app/academic/services/doctor.service';

@Component({
  selector: 'app-sections-schedule',
  templateUrl: './sections-schedule.component.html',
  styleUrls: ['./sections-schedule.component.scss']
})
export class SectionsScheduleComponent implements OnInit {

  filter: any = {};
  filter_search: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  doc: any = document;
  section: any;
  prevsections: any;
  currentsectionName: any;
  currentsectionId: any;
  terms: any = [];
  courses: any = [];
  division_id: any;
  term_id: any;
  level_id: any;
  group_id: any;
  groups: any = [];
  isSubmitted: any;
  student_number: any;
  student_number_search: any;
  curent_term: any;
  doctors: any;
  theaters: any;
  showTable:boolean = false;
  division_id_search: any;
  level_id_search: any;
  course_id: any;
  constructor(
    private doctorService: DoctorService,
    private courseService: CourseService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService ,
    private termService:TermService ) {
    this.applicationSettingService.queueRequests();
    var self = this;
    Request.fire(false, () => {
    });
    this.courseService.get().subscribe((res)=> {
      this.courses = res;
    });
    this.doctorService.get().subscribe((res: any)=>{
      this.doctors = res;
    })
    this.applicationSettingService.theaters().subscribe((res: any) => {
      this.theaters = res;
    })
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.applicationSettingService.sections(this.filter_search).subscribe((res: any) => {
      this.prevsections = res;
    })
    this.applicationSettingService.groups().subscribe((res: any) => {
      this.groups = res;
    })

  }

  load() {
    if (!Helper.validator(this.filter_search, [])) {
      return Message.error(Helper.trans('please choose all filters'));
    }else{
      this.showTable = true;
    }
    this.applicationSettingService.tables(this.filter_search).subscribe((res: any) => {
      this.prevsections = res;
      this.showTable = true;
    })
  }

  createsection() {
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    if (!Helper.validator(this.filter, [])) {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));

    } else {
      this.applicationSettingService.tableStore(this.filter).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();

          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber1').trigger('click');
            // this.section = '';


          }, 1000);
          this.filter_search, ['division_id' , 'level_id']
          this.filter_search.division_id = this.filter.division_id;
          this.filter_search.level_id = this.filter.level_id;

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
      this.applicationSettingService.tableDestroy(id).subscribe((res: any) => {
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
      this.division_id_search = $('#division_id_search').val();
    })
    $('#division_id').on('change' , ()=>{
      this.division_id = $('#division_id').val();
    })
    $('#level_id_search').on('change' , ()=>{
      this.level_id_search = $('#level_id_search').val();
    })
    $('#level_id').on('change' , ()=>{
      this.level_id = $('#level_id').val();
    })
    $('#term_id').on('change' , ()=>{
      this.term_id = $('#term_id').val();
    })
    $('#group_id').on('change' , ()=>{
      this.group_id = $('#group_id').val();
    })
    $('#course_id').on('change' , ()=>{
      this.course_id = $('#course_id').val();
    })
  }

}
