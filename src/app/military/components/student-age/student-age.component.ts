import { Component, OnInit } from '@angular/core';
import { AcademicSettingService } from 'src/app/academic/services/academic-setting.service';
import { CourseService } from 'src/app/academic/services/course.service';
import { ReportServiceService } from 'src/app/academic/services/report-service.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { SettingService } from 'src/app/settings/services/setting.service';
 import { SettingTemplate } from 'src/app/settings/setting-template';
 import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-student-age',
  templateUrl: './student-age.component.html',
  styleUrls: ['./student-age.component.scss']
})
export class StudentAgeComponent extends SettingTemplate implements OnInit {
  responses
  $: any = $;
  doc: any = document;
  constructor(
    private courseService: CourseService,
    private studentAcountService: StudentAccountService,
    private academicSettingService: AcademicSettingService,
    private reportService: ReportServiceService,public settingService: SettingService,
    private applicationSetting: ApplicationSettingService) {
      super(settingService);
      this.baseUrl = "military_age";
      this.requiredFields = ['name'];
      this.get();
     }
  ngOnInit() {
    this.loadData();
  }
  exportExcel() {
    const filename = "سن الطالب"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }


  print() {
    this.doc.printJs();
  }
  printContent() {
    this.doc.printJs();
  }

  action() {
    this.get();
  }
  onPageChange(page: number): void {
    this.currentPage = page;
   }
   currentPage = 1;
   totalPages = 10;
   totalitem
  loadData() {


    this.reportService.getStudentsAge().subscribe((res) => {

      this.responses = res;
      this.totalitem= this.responses.length;
      });
  }
  updateDate() {
    this.responses=null;

    this.reportService.UpdateStudentsAge().subscribe((res) => {

      this.loadData()
      });
  }

}
