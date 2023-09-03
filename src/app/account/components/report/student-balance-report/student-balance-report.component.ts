import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HashTable } from 'angular-hashtable';
import { exit } from 'process';
import { Payment } from 'src/app/account/models/payment';
import { LevelService } from 'src/app/account/services/level.service';
import { ReportService } from 'src/app/account/services/report.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { StudentServiceService } from 'src/app/account/services/student-service.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { AppModule } from 'src/app/app.module';
import { Auth } from 'src/app/shared/auth';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-student-balance-report',
  templateUrl: './student-balance-report.component.html',
  styleUrls: ['./student-balance-report.component.scss']
})
export class StudentBalanceReportComponent implements OnInit {

  doc: any = AppModule.doc;
  applicationSetting: any = ApplicationSettingService;
  student: any = {};
  searchData: any = {};
  response: any = {};
  levels: any = [];
  divisions: any = [];
  caseConstraints: any = [];
  selectedPayment: any = {};
  isSearching: boolean = false;

  //
  selectedLevels = new HashTable();
  selectedDivisions = new HashTable();
  selectedCaseContraints = new HashTable();

  //
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];

  //
  academicYearExpenses: any = [];
  // charts
  chartLevel: any = {};
  chartDivision: any = {};
  chartCaseConstraint: any = {};

  constructor(
    private studentAcountService: StudentAccountService,
    private reportService: ReportService,
    private studentService: StudentServiceService) {
    this.student = {image: '/assets/img/avatar.png'};

    this.response = {
      details: [],
      level_chart: [],
      divisions_chart: [],
      case_constraints: []
    };

    this.initChartObjects();
  }

  ngOnInit() {
    this.loadFilters();
    this.loadDivisions();
    //
    this.loadBalances();
    //
    setTimeout(() => { this.doc.jquery('mat-slide-toggle label').click(); }, 2000);
  }

  initChartObjects() {
    let levelData = [];
    if (this.response.level_chart)
    this.response.level_chart.forEach(element => {
      levelData.push([element.name, element.count]);
    });
    let divisionData = [];
    if (this.response.divisions_chart)
    this.response.divisions_chart.forEach(element => {
      divisionData.push([element.name, element.count]);
    });
    let caseConstraintData = [];
    if (this.response.case_constraints)
    this.response.case_constraints.forEach(element => {
      caseConstraintData.push([element.name, element.count]);
    });

    // level chart object
    this.chartLevel = {
      title: Helper.trans('student count in levels'),
      type: 'PieChart',
      data: levelData,
      columnNames: [Helper.trans('level'), Helper.trans('student_count')],
      options: {},
      width: 200,
      height: 200,
    };

    // division chart object
    this.chartDivision = {
      title: Helper.trans('student count in divisions'),
      type: 'PieChart',
      data: divisionData,
      columnNames: [Helper.trans('division'), Helper.trans('student_count')],
      options: {},
      width: 200,
      height: 200,
    };

    // division chart object
    this.chartCaseConstraint = {
      title: Helper.trans('student count in case_contraints'),
      type: 'PieChart',
      data: caseConstraintData,
      columnNames: [Helper.trans('case_constraint'), Helper.trans('student_count')],
      options: {},
      width: 200,
      height: 200,
    };
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
      this.loadStuentInfo(student.id);
      this.loadBalances();
    }
    this.studentSearchDialogShow = false;
  }

  loadStuentInfo(id) {
    this.studentAcountService.getStudentAccount(id).subscribe((res: any) => {
      this.student = res;
    });
  }

  loadBalances() {
    this.searchData.levels = this.selectedLevels.getKeys();
    this.searchData.divisions = this.selectedDivisions.getKeys();
    this.searchData.case_constraints = this.selectedCaseContraints.getKeys();
    this.isSearching = true;
    this.reportService.getStudentBalances(this.searchData).subscribe((res: any) => {
      this.response = res;
      this.isSearching = false;
      //
      this.initChartObjects();
      //
      this.levels = res.level_chart;
      this.divisions = res.divisions_chart;
      this.caseConstraints = res.case_constraints;
    });
  }


  prepareTotal(res: any) {
    //this.academicYearExpenses.forEach(element => {
    //  element.total = res['academic_year_expense'][element.id];
    //});

  }

  loadFilters() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = this.applicationSetting.DIVISIONS;
    this.caseConstraints = this.applicationSetting.CASE_CONSTRAINTS;
    //
  }

  loadDivisions() {
    this.divisions = this.applicationSetting.DIVISIONS;
  }
  //***********************************************
  //*** report option methods
  //***********************************************

  toggle(id, list = new HashTable()) {
    if (list.has(id))  {
      list.remove(id);
    }
    else {
      list.put(id, id);
    }
  }

  calculateReportHeight() {
    return window.innerHeight - 80;
  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "تقرير طالب تفصيلى-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

  //***********************************************
  //*** report data method
  //***********************************************


}
