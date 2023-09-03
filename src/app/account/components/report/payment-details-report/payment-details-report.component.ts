import { Component, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { exit } from 'process';
import { AcademicYearService } from 'src/app/account/services/academic-year.service';
import { DivisionService } from 'src/app/account/services/division.service';
import { LevelService } from 'src/app/account/services/level.service';
import { ReportService } from 'src/app/account/services/report.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { StudentServiceService } from 'src/app/account/services/student-service.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { AppModule } from 'src/app/app.module';
import { Auth } from 'src/app/shared/auth';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-payment-details-report',
  templateUrl: './payment-details-report.component.html',
  styleUrls: ['./payment-details-report.component.scss']
})
export class PaymentDetailsReportComponent implements OnInit {

  doc: any = AppModule.doc;
  searchData: any = {};
  applicationSetting: any = ApplicationSettingService;
  users: any = [];
  levels: any = [];
  divisions: any = [];
  services: any = [];
  academicYears: any = [];
  academicYearExpenses: any = [];
  counter: any;
  //
  selectedLevels = new HashTable();
  selectedDivisions = new HashTable();
  selectedYears = new HashTable();
  selectedServices = new HashTable();
  selectedAcademicYearExpenses = new HashTable();
  selectedTypes = new HashTable();
  $: any = $;

  //
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];

  //
  payments: any = [];
  isSubmitted = false;

  constructor(
    private userService: UserService,
    private studentService: StudentServiceService,
    private reportService: ReportService,
    private acadeimicYearExpenseService: AcademicYearService,
    private studentAcountService: StudentAccountService) {
      let inputDate = new Date().toISOString().substring(0, 10);
      console.log(inputDate);
      this.searchData.date_from = inputDate;
      this.searchData.date_to = inputDate;
    }

  loadSelectedType() {
    this.selectedTypes.put(ReportType.OUT, ReportType.OUT);
    this.selectedTypes.put(ReportType.IN, ReportType.IN);
  }


  loadUsers() {
    this.userService.get().subscribe((res) => {
      this.users = res;
    });
  }

  loadLevels() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    //
    this.levels.forEach(element => {
      this.selectedLevels.put(element.id, element.id);
    });
  }

  loadDivisions() {
    this.divisions = this.applicationSetting.DIVISIONS;
    //
    this.divisions.forEach(element => {
      this.selectedDivisions.put(element.id, element.id);
    });
  }

  loadAcademicYears() {
    this.academicYears = this.applicationSetting.ACADEMIC_YEARS;
    //
    this.academicYears.forEach(element => {
      this.selectedYears.put(element.id, element.id);
    });
  }

  loadServices() {
    this.studentService.get().subscribe((res: any) => {
      this.services = [];
      res.forEach(element => {
        if (element.is_academic_year_expense != 1) {
          this.services.push(element);
          this.selectedServices.put(element.id, element.id);
        }
      });
    });
  }

  loadAcadeimicYearExpenses() {
    this.studentService.get().subscribe((res: any) => {
      this.academicYearExpenses = [];
      res.forEach(element => {
        if (element.is_academic_year_expense == 1) {
          this.academicYearExpenses.push(element);
          //
          this.selectedAcademicYearExpenses.put(element.id, element.id);
        }
      });
    });
  }

  toggleType(value) {
    /*if (this.searchData.payment_type == value)
      this.searchData.payment_type = '';
    else
      this.searchData.payment_type = value;
*/
    if (this.selectedTypes.has(value))
      this.selectedTypes.remove(value);
    else
      this.selectedTypes.put(value, value);
  }

  toggle(id, list = new HashTable()) {
    if (list.has(id))  {
      list.remove(id);
    }
    else {
      list.put(id, id);
    }
  }

  loadPayments() {
    this.searchData.level_id = this.selectedLevels.getKeys();
    this.searchData.division_id = this.selectedDivisions.getKeys();
    this.searchData.academic_year_id = this.selectedYears.getKeys();
    this.searchData.services = this.selectedServices.getKeys();
    this.searchData.payment_type = this.selectedTypes.getKeys();
    this.searchData.academic_year_expenses = this.selectedAcademicYearExpenses.getKeys();
    this.isSubmitted = true;
    this.reportService.get(this.searchData).subscribe((res: any) => {
      // pagination page number
      this.counter = [];
      for(var x = 0 ; x < res.details.last_page ; x++ ){
        this.counter.push(' ');
      }

      $(`.active1`).addClass("active");
      this.payments = res;
      this.prepareTotal(res);
      this.isSubmitted = false;
    });
  }
  pageDataPagination(index: any){
    this.searchData.level_id = this.selectedLevels.getKeys();
    this.searchData.division_id = this.selectedDivisions.getKeys();
    this.searchData.academic_year_id = this.selectedYears.getKeys();
    this.searchData.services = this.selectedServices.getKeys();
    this.searchData.payment_type = this.selectedTypes.getKeys();
    this.searchData.academic_year_expenses = this.selectedAcademicYearExpenses.getKeys();
    this.isSubmitted = true;
    this.searchData.pageNumber = index;

    this.reportService.getPages(this.searchData).subscribe((res: any) => {
      for(var x = 0 ; x < this.counter.length ; x++ ){
        $(`.active${x+1}`).removeClass("active");
      }
      $(`.active${index}`).addClass("active");
      this.payments = res;
      this.prepareTotal(res);
      this.isSubmitted = false;
    });
  }


  prepareTotal(res: any) {
    this.services.forEach(element => {
      element.total = res['services'][element.id];
    });
    this.academicYearExpenses.forEach(element => {
      element.total = res['academic_year_expense'][element.id];
    });

  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "مدفوعات الطلاب-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

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
    }
    this.studentSearchDialogShow = false;
  }

  toggleServiceType(element: any, type) {
    if (element.checked) {
      //this.searchData.service_type = type;
      //this.selectedServices = new HashTable();
      this.services.forEach(element => {
        if (element.type == type) {
          this.selectedServices.put(element.id, element.id);
        }
      });
    } else {
      //this.searchData.service_type = type;
      //this.selectedServices = new HashTable();
      this.services.forEach(element => {
        if (element.type == type) {
          this.selectedServices.remove(element.id);
        }
      });
    }
  }

  /*
  toggleServiceType(type) {
    if (this.searchData.service_type == type) {
      this.searchData.service_type= '';
      this.selectedServices = new HashTable();
    }
    else  {
      this.searchData.service_type = type;
      this.selectedServices = new HashTable();
      this.services.forEach(element => {
        if (element.type == type) {
          this.selectedServices.put(element.id, element.id);
        }
      });
    }
  }
  */

  ngOnInit() {
    this.loadSelectedType();
    this.loadUsers();
    this.loadLevels();
    this.loadDivisions();
    this.loadAcademicYears();
    this.loadServices();
    this.loadAcadeimicYearExpenses();

    //
    this.loadPayments();
    //
    setTimeout(() => {
      //this.$('.mat-slide-toggle-thumb-container').click();
    }, 4000);
  }

}


enum ReportType {
  OUT = 'out', IN = 'in'
}
