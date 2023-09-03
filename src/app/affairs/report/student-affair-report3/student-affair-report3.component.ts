import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { LevelService } from 'src/app/account/services/level.service';
import { HashTable } from 'angular-hashtable';
import { AcademicSettingService } from 'src/app/academic/services/academic-setting.service';
import { CourseService } from 'src/app/academic/services/course.service';
import { ReportServiceService } from 'src/app/academic/services/report-service.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { TermService } from 'src/app/account/services/term.service';
@Component({
  selector: 'app-student-affair-report3',
  templateUrl: './student-affair-report3.component.html',
  styleUrls: ['./student-affair-report3.component.scss']
})
export class StudentAffairReport3Component implements OnInit {

  $: any = $;
  case_constraint_id:any;
  doc: any = document;
  isSubmitted = false;
  canShowResult = false;
  searchData: any = {};
  response: any = null;
  student: any = {};
  password = null;
  searchCourseKey = null;
  currentPage = 1;
  filter: any = {};
  applicationService: any = ApplicationSettingService;
  terms: any = [];
  levels: any = [];
  divisions: any = [];
  courses: any = [];
  academicYears: any = [];
  start_number: any;
  level_id: any;
  public studentSettings = ApplicationSettingService;

  selectedDivisions = new HashTable();
  selectedLevels = new HashTable();
  academicSetting = new HashTable();
  selectedCourses = new HashTable();
    //
    public searchKey: string;
    public studentSearchDialogShow = false;
    public studentSearchDialogLoader = false;
    public isWait = false;
    public timeoutId;
    public students: any = [];

  constructor(
    private courseService: CourseService,
    private studentAcountService: StudentAccountService,
    private academicSettingService: AcademicSettingService,
    private reportService: ReportServiceService,
    private applicationSetting: ApplicationSettingService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });
          

    }
    ngOnInit() {
      this.levels = Cache.get(LevelService.LEVEL_PREFIX);
      
    }
  calculateCount() {
    this.$('#count').text(this.$('#reportContent tbody tr').length);
  }

  load() {
    // if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academic_year_id' ,'is_application','qualification_id','is_register','created_at','isVaccinated'])) {
    //  return Message.error(Helper.trans('please choose all filters'));
    // }

    this.globalService.loadHtml("affair/report3", this.filter).subscribe((res) => {
      // case_constraint_id: this.student.case_constraint_id,
      console.log(this.case_constraint_id);
      
      $('#reportContent').html(res);
      this.calculateCount();
    });
  }
  sendNumber(){
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = {level_id: this.level_id , start_number: this.start_number};
    console.log(objectSend)
    if(this.level_id == undefined || this.start_number == undefined){
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
    } else {
      this.applicationSettingService.makeNumber(objectSend).subscribe((res)=>{
        if(res == 1){
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumberSuccess').slideUp(1000);
        $('#closeNumber').trigger('click');
        this.level_id = '';
        this.start_number = '';

      }, 1000);
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
        }
      })
    }
  }
  print() {
    Helper.print();
  }

  printContent() {
    this.doc.printJs();
  }
  excel() {
    this.doc.exportExcel();
  }
//'الطلبة' , '#report3'

}
