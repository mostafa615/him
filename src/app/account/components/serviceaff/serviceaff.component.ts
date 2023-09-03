import { Component, OnInit ,Input, SimpleChanges } from '@angular/core';
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
import { HashTable } from 'angular-hashtable';
import { AppModule } from 'src/app/app.module';
import { StudentServiceService } from 'src/app/account/services/student-service.service';
import { AcademicSettingService } from 'src/app/academic/services/academic-setting.service';
import { CourseService } from 'src/app/academic/services/course.service';
import { ReportServiceService } from 'src/app/academic/services/report-service.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-serviceaff',
  templateUrl: './serviceaff.component.html',
  styleUrls: ['./serviceaff.component.scss']
})
export class ServiceaffComponent implements OnInit {
  services: any = [];
  public doc: any = AppModule.doc;
  public total = 0;
  @Input() safeObject: any = {};
  $: any = $;
  filter: any = {};

  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  // doc: any = document;
  terms: any = [];
  selectedServices: any;
  isSubmitted = false;
  canShowResult = false;
  searchData: any = {};
  response: any = null;
  student: any = {};
  password = null;
  searchCourseKey = null;
  currentPage = 1;
  courses: any = [];
  val:string ="";
  val2:string ="";
  idStudent: any;
  today = new Date();
  changedDate = '';
  birthdaytime:any;
  public isLoad = false;
  level_id: any;
  public academicYearExpense: any = {};

  selectedDivisions = new HashTable();
  selectedLevels = new HashTable();
  academicSetting = new HashTable();
  selectedCourses = new HashTable();
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];
  SettingService: any;
  constructor(
    private courseService: CourseService,
    private studentAcountService: StudentAccountService,
    private academicSettingService: AcademicSettingService,
    private reportService: ReportServiceService,
    private applicationSetting: ApplicationSettingService,
    private academicService: AcademicYearService,
    private termService:TermService,
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService,
    private studentServiceService:StudentServiceService) {
      this.preSettings();

    this.titleService.setTitle("HIM"+ " - " + Helper.trans('print result'))
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });

}
selectStudent(student) {
  if (student) {
    
    this.searchData.student_id = student.id;
    this.searchKey = student.name;
    this.filter.student_id = student.id || -1
    // this.loadStudentInfo(student.id);
  }
  this.studentSearchDialogShow = false;
}
load() {
  console.log(this.filter);
  
  if (!Helper.validator(this.filter, ['level_id' , 'year_id' ])) {
    return Message.error(Helper.trans('please choose all filters'));
  }

  this.globalService.loadHtml("account/report31", this.filter).subscribe((res) => {
    // this.searchData.student_id = this.student.id;
    this.student = 1
    // this.loadStudentInfo(student.id);

    $('#reportContent').html(res);
  });
}


getServices() {
this.globalService.get('account/services').subscribe(res => {
  this.services = res
  console.log(res);
  
},err=>{
  Message.error("حدث خطأ في استرجاع الخدمات ما حاول مرة اخرى");
  console.log(err);
  
})
}

searchInputEvent() {
  if (!this.searchKey)
    return this.filter.student_id = -1;

  this.students = [];
  this.studentSearchDialogLoader = true;
  this.isWait = true;
  clearTimeout(this.timeoutId);

  this.timeoutId = setTimeout(() => {
     this.searchAboutStudent();
  }, 500);
}

searchAboutStudent() {
  this.studentAcountService.search(this.searchKey).subscribe((r) => {
      this.studentSearchDialogLoader = false;
      this.students = r;
      if (this.students.length > 0) {
        this.studentSearchDialogShow = true;
      }
  });
}

// selectStudent(student) {
//   if (student) {
//     this.searchData.student_id = student.id;
//     this.searchKey = student.name;
//     this.loadStudentInfo(student.id);
//   }
//   this.studentSearchDialogShow = false;
// }
loadData() {
  this.searchData.courses = this.selectedCourses.getKeys();
  this.searchData.levels = this.selectedLevels.getKeys();
  this.searchData.divisions = this.selectedDivisions.getKeys();
  this.searchData.page = this.currentPage;
  this.searchData.year_id = this.filter.year_id;
  this.isSubmitted = true;


}

filterCourses(term){
  if(! this.response) return []
  return this.response.registerCourses.filter(c => c.term_id == term)
}
getTermGpa(term){
  if(! this.response) return 0
  var gpa = this.response.student_gpa_fasly.filter(g => g.term_id == term)[0].gpa
  return gpa
}
getStdCode(){
  if(! this.response) return 0
  var code  = this.response.studentInfo[0].code
  return code

}
preSettings() {
  Request.addToQueue({observer: this.courseService.get(), action: (res: any)=>{
    this.courses = res;
  }});
  Request.addToQueue({observer: this.applicationSetting.getDivisions(), action: (res: any)=>{
    this.divisions = res;
  }});
  Request.addToQueue({observer: this.academicSettingService.get(), action: (res: any)=>{
    this.academicSetting = new HashTable();
    res.forEach(element => {
      this.academicSetting.put(element.id, element);
    });
  }});
}
loadSettings() {
  this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  Request.fire();
}
test($event)
{
  console.log($event.target.value)
}
// loadStudentInfo(id) {
//   this.academicSettingService.getStudentInfo(id).subscribe((res: any) => {
//     this.student = res;
//     this.loadData();
//   });
// }
excel() {
  this.doc.exportExcel();
}

printContent() {
  this.doc.printJs();
}
loadAcademicYearExpenses() {
  let data = {level_id: this.filter.level_id}
  this.academicService.get(data).subscribe( (res: any) => {
    console.log(res);
    this.academicYearExpense = res;
    this.isLoad = false;
    console.log(this.academicYearExpense.details);
  });
}
  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.getServices()
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.loadSettings();
  }
 
}
