import { Component, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { LevelService } from 'src/app/account/services/level.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Request } from 'src/app/shared/request';
import { AcademicSettingService } from '../../services/academic-setting.service';
import { CourseService } from '../../services/course.service';
import { ReportServiceService } from '../../services/report-service.service';
import { Auth } from 'src/app/shared/auth';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Title } from '@angular/platform-browser';
import { TermService } from 'src/app/account/services/term.service';

@Component({
  selector: 'app-control-report',
  templateUrl: './control-report.component.html',
  styleUrls: ['./control-report.component.scss']
})
export class ControlReportComponent implements OnInit {

  $: any = $;
  doc: any = document;
  isSubmitted = false;
  canShowResult = false;
  searchData: any = {};
  response: any = {};
  student: any = {};
  password = null;
  searchCourseKey = null;
  currentPage = 1;

  levels: any = [];
  divisions: any = [];
  courses: any = [];

  selectedDivisions = new HashTable();
  selectedLevels = new HashTable();
  academicSetting = new HashTable();
  selectedCourses = new HashTable();

  filter: any = {};
  applicationService: any = ApplicationSettingService;
  terms: any = [];

  //
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];


  constructor(
    private titleService: Title,
    private globalService: GlobalService,
    private courseService: CourseService,
    private studentAcountService: StudentAccountService,
    private academicSettingService: AcademicSettingService,
    private reportService: ReportServiceService,
    private applicationSetting: ApplicationSettingService) {
    this.titleService.setTitle("HIM"+ " - " + Helper.trans('control report'))
      this.preSettings();
    }

  ngOnInit() {
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.loadSettings();
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

  loadData() {
    this.searchData.courses = this.selectedCourses.getKeys();
    this.searchData.levels = this.selectedLevels.getKeys();
    this.searchData.divisions = this.selectedDivisions.getKeys();
    this.searchData.page = this.currentPage;
    this.isSubmitted = true;
    this.reportService.get(this.searchData).subscribe((res) => {
      this.response = res;
      this.prePagniation();
      this.isSubmitted = false;
    });
  }
// ========================
  login() {
    let resultPassword: any = this.academicSetting.get(12);
    if (!resultPassword)
      return;
    if (this.password == resultPassword.value) {
      this.canShowResult = true;
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

  print() {
    Helper.print();
  }

  exportExcel() {
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
