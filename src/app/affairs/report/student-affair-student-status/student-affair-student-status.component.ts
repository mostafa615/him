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
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-student-affair-student-status',
  templateUrl: './student-affair-student-status.component.html',
  styleUrls: ['./student-affair-student-status.component.scss']
})

export class StudentAffairStudentStatusComponent implements OnInit {
  $: any = $;
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
  val:string ="";
  val2:string ="";
  idStudent: any;
  today = new Date();
  changedDate = '';
  birthdaytime:any;

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
  SettingService: any;


  constructor(
    private courseService: CourseService,
    private studentAcountService: StudentAccountService,
    private academicSettingService: AcademicSettingService,
    private reportService: ReportServiceService,
    private applicationSetting: ApplicationSettingService,
    private globalService: GlobalService
    ) {
      this.preSettings();
     
    }

  ngOnInit() {
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.loadSettings();
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
  loadData() {
    this.searchData.courses = this.selectedCourses.getKeys();
    this.searchData.levels = this.selectedLevels.getKeys();
    this.searchData.divisions = this.selectedDivisions.getKeys();
    this.searchData.page = this.currentPage;
    this.searchData.year_id = this.filter.year_id;
    this.isSubmitted = true;


    // console.log( this.searchData);

    if(this.filter.year_id){
      
      this.reportService.getWithStatus(this.searchData).subscribe((res) => {
        // this.birthdaytime = this.birthdaytime;
        this.response = res;
        this.prePagniation();
        this.isSubmitted = false;
      });
    }

  }

 

  searchAboutCourse() {
    let self = this;
    if (!this.searchCourseKey)
      return this.$('.course-item').show();

    this.$('.course-item').hide();
    this.$('.course-item').each(( index, element ) => {
      if (self.$(element).text().indexOf(self.searchCourseKey) >= 0) {
        self.$(element).show();
      }
    });
  }

  toggle(id, list = new HashTable()) {
    if (list.has(id))  {
      list.remove(id);
    }
    else {
      list.put(id, id);
    }
  }

  loadPage(page) {
    this.currentPage = page;
    this.loadData();
  }

  prePagniation() {
    if (!this.response.data)
      return;
    this.response.prev_page = this.response.prev_page_url? this.response.prev_page_url.replace(this.response.path+'?page=', '') : null;
    this.response.next_page = this.response.next_page_url? this.response.next_page_url.replace(this.response.path+'?page=', '') : null;
    this.response.pages = Math.ceil(this.response.total / this.response.per_page);
    this.response.pages_arr = [];
    for(let i = 0; i < this.response.pages; i ++)
      this.response.pages_arr.push(i+1);
  }
    //this.id_current = res.id;
//   this.globalService.save({name: this.val, id: this.idStudent}).subscribe((res:any)=>{
// })
// this.doc.printJs();
// <div class="control-message" *ngIf="!canShowResult">
// <div class="custom-panel w3-display-container w3-round application-panel student-info-panel">
// <div class="custom-panel-body table-responsive w3-padding w3-center">
// <input class="w3-round-xxlarge w3-white w3-input border-gray search-input w3-center" 
// style="width: 90%!important" type="password" 
// placeholder="{{ 'enter password of result' | trans }}" [(ngModel)]="password">
// <br>
// <br>
// <button class="btn w3-light-gray w3-round-xlarge" (click)="login()">{{ "show" | trans }}</button>
// </div>
// </div>
// </div>

  print() {
    var check = 0;
    var array = this.student.payments;
    for(let i = 0 ; i < array.length ; i++){
      if(array[i].model_object.id == 16){
        check = 1;
      }
    }
    if(check == 1) {
      Helper.print();
    } else {
      let password = prompt("يجب تسديد مبلغ الخدمة وقيمته 50 للأستثناء ادخل الرقم السري : ");
      let resultPassword: any = this.academicSetting.get(13);
      console.log(resultPassword);
      
      if (resultPassword.value == password) {
        Helper.print();
      } else {
        alert('الرقم السري غير صحيح');
      }
    }
  }
  login() {
    let resultPassword: any = this.academicSetting.get(13);
    if (!resultPassword)
      return;
    if (this.password == resultPassword.value) {
      this.canShowResult = true;
    }
  }


  exportExcel()
  {
    const filename = "مدفوعات الطلاب-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }



  //***********************************************
  //*** student search methods
  //***********************************************
  //
  searchInputEvent() {
    if (!this.searchKey)
      return;

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

  selectStudent(student) {
    if (student) {
      this.searchData.student_id = student.id;
      this.searchKey = student.name;
      this.loadStudentInfo(student.id);
    }
    this.studentSearchDialogShow = false;
  }

  loadStudentInfo(id) {
    this.academicSettingService.getStudentInfo(id).subscribe((res: any) => {
      this.student = res;
      this.loadData();
    });
  }
}
