import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-students-report',
  templateUrl: './print-students-report.component.html',
  styleUrls: ['./print-students-report.component.scss']
})
export class PrintStudentsReportComponent implements OnInit {
  public $: any = $;
  public doc: any = document;
  constructor() { }

  ngOnInit() {
    var self = this;
    setTimeout(() => {
      let height = window.innerHeight - 60;
      self.$('.student-affair-container').css('height', height+"px");
      //
      console.log(height);
    }, 500);
  }

}
