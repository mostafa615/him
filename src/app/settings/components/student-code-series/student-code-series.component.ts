import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Auth } from 'src/app/shared/auth';
import { Cache } from 'src/app/shared/cache';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-student-code-series',
  templateUrl: './student-code-series.component.html',
  styleUrls: ['./student-code-series.component.scss']
})
export class StudentCodeSeriesComponent extends SettingTemplate implements OnInit {

  academicYears: any = [];
  levels: any = [];


  constructor(public settingService: SettingService, private globalService: GlobalService) {
    super(settingService);
    this.baseUrl = "student_code_series";
    this.requiredFields = ['code', 'academic_year_id', 'level_id'];
    this.get();
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.academicYears = ApplicationSettingService.ACADEMIC_YEARS;

    this.globalService.get('adminision/get_academic_years').subscribe((res) => {
      this.academicYears = res;
    });

    this.globalService.get('levels').subscribe((res) => {
      this.levels = res;
    });
  }


  action() {
    this.get();
  }
}
