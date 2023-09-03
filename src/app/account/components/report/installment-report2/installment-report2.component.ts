import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { ReportService } from 'src/app/account/services/report.service';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-installment-report2',
  templateUrl: './installment-report2.component.html',
  styleUrls: ['./installment-report2.component.scss']
})
export class InstallmentReport2Component implements OnInit {
  doc: any = document;
  searchData: any = {};
  response: any = {};
  isSubmitted = false;
  installments:any = {};
  installment_id:any
  installment_status:any

  constructor(private reportService: ReportService) {
    this.response = {
      details: []
    };
  }


  loadData() {
    if (!Helper.validator(this.searchData, ['installment_id','installment_status'])) {
      this.isSubmitted = false;
      return Message.error(Helper.trans('please choose all filters'));
    }else {
      this.isSubmitted = true;
    }
    this.reportService.getStudentModelPay(this.searchData).subscribe((res) => {
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

  ngOnInit() {
    this.reportService.getModelPay().subscribe((res) => {
      this.installments = res;
    })
  }

}
