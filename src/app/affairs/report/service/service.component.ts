import { Component, OnInit ,Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LevelService } from 'src/app/account/services/level.service';
import { DivisionService } from 'src/app/account/services/division.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { TermService } from 'src/app/account/services/term.service';
import { AcademicYearService } from 'src/app/account/services/academic-year.service';
import { HashTable } from 'angular-hashtable';
import { AppModule } from 'src/app/app.module';
import { StudentServiceService } from 'src/app/account/services/student-service.service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  services: any = [];
  public doc: any = AppModule.doc;
  public total = 0;
  @Input() safeObject: any = {};
  $: any = $;
  filter: any = {};
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  // doc: any = document;
  terms: any = [];
  selectedServices: any;

  constructor(
    private academicService: AcademicYearService,
    private termService:TermService,
    private titleService: Title,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService,
    private studentServiceService:StudentServiceService) {
    this.titleService.setTitle("HIM"+ " - " + Helper.trans('print result'))
        this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });

}

load() {
  if (!Helper.validator(this.filter, ['level_id' , 'year_id' ])) {
    return Message.error(Helper.trans('please choose all filters'));
  }

  this.globalService.loadHtml("affair/report31", this.filter).subscribe((res) => {
    $('#reportContent').html(res);
  });
}


getServices() {
this.globalService.get('account/services').subscribe(res => {
  this.services = res
  console.log(res);
  
},err=>{
  Message.error("حدث خطأ في استرجاع الخدمات ما حاول مرة اخرى");
  console.log(err);
  
})
}


excel() {
  this.doc.exportExcel();
}

printContent() {
  this.doc.printJs();
}
  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.getServices()
  }
 
}
