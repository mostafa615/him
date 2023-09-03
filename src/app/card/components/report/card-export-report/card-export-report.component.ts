import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HashTable } from 'angular-hashtable';
import { Payment } from 'src/app/account/models/payment';
import { LevelService } from 'src/app/account/services/level.service';
import { ReportService } from 'src/app/account/services/report.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { StudentServiceService } from 'src/app/account/services/student-service.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { AppModule } from 'src/app/app.module';
import { CardService } from 'src/app/card/services/card.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-card-export-report',
  templateUrl: './card-export-report.component.html',
  styleUrls: ['./card-export-report.component.scss']
})
export class CardExportReportComponent implements OnInit {

  doc: any = AppModule.doc;
  applicationSetting: any = ApplicationSettingService;
  student: any = {};
  searchData: any = {};
  response: any = {};
  levels: any = [];
  divisions: any = [];
  cardtypes: any = [];
  selectedPayment: any = {};
  isSearching: boolean = false;

  //
  selectedLevels = new HashTable();
  selectedDivisions = new HashTable();
  selectedCardTypes = new HashTable();

  //
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];

  //
  academicYearExpenses: any = [];

  constructor(
    private studentAcountService: StudentAccountService,
    private reportService: ReportService,
    private cardService: CardService,
    private studentService: StudentServiceService) {
    this.student = {image: '/assets/img/avatar.png'};

    this.response = {
      details: [],
      levels: [],
      divisions: [],
      card_types: []
    };

  }

  ngOnInit() {
    this.loadFilters();
    this.loadDivisions();
    //
    this.loadData();
    //
    setTimeout(() => { this.doc.jquery('mat-slide-toggle label').click(); }, 2000);
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
      this.loadData();
    }
    this.studentSearchDialogShow = false;
  }

  loadStuentInfo(id) {
    this.studentAcountService.getStudentAccount(id).subscribe((res: any) => {
      this.student = res;
    });
  }

  loadData() {
    this.searchData.levels = this.selectedLevels.getKeys();
    this.searchData.divisions = this.selectedDivisions.getKeys();
    this.searchData.cards = this.selectedCardTypes.getKeys();
    this.isSearching = true;
    this.cardService.getCards(this.searchData).subscribe((res: any) => {
      this.response = res;
      this.isSearching = false;
      //
      //
      this.levels = res.levels;
      this.divisions = res.divisions;
      this.cardtypes = res.card_types;
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

    this.cardService.getTypes().subscribe((res: any) => {
      this.cardtypes = res;
    });
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
