import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { LevelService } from 'src/app/account/services/level.service';
import { ReportService } from 'src/app/account/services/report.service';
import { Auth } from 'src/app/shared/auth';
import { TermService } from 'src/app/account/services/term.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { CourseService } from 'src/app/academic/services/course.service';
import { AcademicYearService } from 'src/app/account/services/academic-year.service';
import { Title } from '@angular/platform-browser';
import { DivisionService } from 'src/app/account/services/division.service';
@Component({
  selector: 'app-student-discount-report',
  templateUrl: './student-discount-report.component.html',
  styleUrls: ['./student-discount-report.component.scss']
})
export class StudentDiscountReportComponent implements OnInit {

  doc: any = document;
  searchData: any = {};
  response: any = {};
  isSubmitted = false;
  levels: any = [];
  level_id:any;
  // terms: any = [];
  // term_id:any;
  groups: any = [];
  filter: any = {};
  division_id:any;
  divisions: any = [];


  constructor(private reportService: ReportService,
    private courseService: CourseService,
    private academicService: AcademicYearService,
    private termService:TermService,
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.groups = this.applicationSettingService.groups().subscribe((res: any) => {
        this.groups = res;
      })
      
    this.response = {
      details: []
    };
  }

  ngOnInit() {
    this.loadData();
    $('#level_id').on('change' , ()=>{
      this.level_id = $('#level_id').val();
    })
    // $('#term_id').on('change' , ()=>{
    //   this.term_id = $('#term_id').val();
    // })
    $('#division_id').on('change' , ()=>{
      this.division_id = $('#division_id').val();
    })
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    // this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);



  }

  loadData() {
    this.isSubmitted = true;
    this.reportService.getStudentDiscounts(this.searchData).subscribe((res) => {
      this.response = res;
      this.isSubmitted = false;
    });
  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "تقرير اعفاءات الطلاب-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

  toggle(value) {
    this.searchData.type != value? this.searchData.type = value : this.searchData.type = 'all_installment';
  }

}
