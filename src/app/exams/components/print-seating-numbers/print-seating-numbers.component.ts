import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';
import { CourseService } from '../../../academic/services/course.service';
import { DivisionService } from 'src/app/account/services/division.service';
import { TermService } from 'src/app/account/services/term.service';
@Component({
  selector: 'app-print-seating-numbers',
  templateUrl: './print-seating-numbers.component.html',
  styleUrls: ['./print-seating-numbers.component.scss']
})
export class PrintSeatingNumbersComponent implements OnInit {
  filter: any = {};
  $: any = $;
  terms:any;
  applicationService: any = ApplicationSettingService;
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  courses: any = [];
  levels: any = [];
  level_id: any;
  commissionsGet: any;
  division_id: any;
  
  constructor(
    private courseService: CourseService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });
      this.courseService.get().subscribe((res) => {
        this.courses = res;
      });


    }

  load() {
    // if (!Helper.validator(this.filter, ['course_id'])) {
    //   return Message.error(Helper.trans('please choose all filters'));
    // }

    this.globalService.loadHtml("affair/report8", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
    });
  }

  printContent() {
    this.doc.printJs();
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    // set select2
    setTimeout(() => {
      this.$('.select2').select2();
    }, 500);
    this.applicationSettingService.commissions().subscribe((res)=>{
      this.commissionsGet = res;
    })
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);

  }

}
