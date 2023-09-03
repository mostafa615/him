import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { TermService } from 'src/app/account/services/term.service';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { Auth } from 'src/app/shared/auth';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { ApplicationSettingService } from '../../services/application-setting.service';

@Component({
  selector: 'app-adminision-setting',
  templateUrl: './adminision-setting.component.html',
  styleUrls: ['./adminision-setting.component.scss']
})
export class AdminisionSettingComponent implements OnInit {

  breadcrumbList: any = [];
  adminisionSetting5: any = {};
  terms: any = [];

  currentTerm: any = {};


  isSubmitted5 = false;

  constructor(private service: ApplicationSettingService, private termService: TermService, private systemSetting: SystemSettingService) {
    !Auth.can('application_setting')? exit() : '';
    // init breadcrum
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: 'adminision_settings'}
    ];
  }


  loadSettings() {
    this.service.getSettings().subscribe((r: any) => {
      r.forEach(element => {
        if (element.id == 5) {
          this.adminisionSetting5 = element;
        }
      });
    });

    this.terms = Cache.get(TermService.TERPM_PREFIX);

  }

  loadSetting() {
    this.systemSetting.getSystemSetting().subscribe((res: any)=>{
      this.currentTerm = res['current_term'];
    });
  }

  updateSettings(element) {
    this.isSubmitted5 = true;
    this.service.updateSetting(element).subscribe((r: any) => {
      if (r.status == 1) {
        Message.success(r.message);
      } else {
        Message.error(r.message);
      }
      this.isSubmitted5 = false;
    });
  }

  ngOnInit() {
    this.loadSettings();
    this.loadSetting();
  }

}
