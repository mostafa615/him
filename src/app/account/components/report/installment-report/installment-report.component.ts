import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { ReportService } from 'src/app/account/services/report.service';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-installment-report',
  templateUrl: './installment-report.component.html',
  styleUrls: ['./installment-report.component.scss']
})
export class InstallmentReportComponent implements OnInit {

  doc: any = document;
  searchData: any = {};
  response: any = {};
  isSubmitted = false;

  constructor(private reportService: ReportService) {
    this.response = {
      details: []
    };
  }


  loadData() {
    this.isSubmitted = true;
    if(this.searchData.type == null) this.searchData.type = 'all_installment';
    if(this.searchData.type == '') this.searchData.type = 'all_installment';
    this.reportService.getStudentInstallment(this.searchData).subscribe((res) => {
      this.isSubmitted = false;
      this.response = res;
    });
  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "تقرير اقساط الطلاب-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

  toggle(value) {
    this.searchData.type != value? this.searchData.type = value : this.searchData.type = '';
  }
  ngOnInit() {
    // this.loadData();
  }

}
