import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { StudentResultService } from '../../services/student-result.service';

@Component({
  selector: 'app-result-transfer',
  templateUrl: './result-transfer.component.html',
  styleUrls: ['./result-transfer.component.scss']
})
export class ResultTransferComponent implements OnInit {

  public currentStep = 1;
  public result: any = [];
  public loading = false;
  public doc: any = document;

  constructor(private studentResultService: StudentResultService) { }

  ngOnInit() {
  }

  goToStep2() {
    this.currentStep = 2;
  }

  goToStep(step) {
    this.currentStep = step;
  }

  public start() {
    // start looding
    this.loading = true;
    this.currentStep = 3;
    let self = this;
    this.studentResultService.startResultTransfer().subscribe(function(r: any){
      if (r.status == 1) {
        Message.success(r.message);
      } else {
        Message.success(r.message);
      }
      self.result = r.data;
      self.loading = false;
      self.goToStep(4);
      console.log(self.currentStep);
    });
  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "الطلاب الغير مطابقين للشروط" + "-" + new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }
}
