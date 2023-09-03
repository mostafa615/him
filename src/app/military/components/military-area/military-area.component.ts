import { Component, OnInit } from '@angular/core';
import { SettingTemplate } from 'src/app/settings/setting-template';
import { SettingService } from 'src/app/settings/services/setting.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';

@Component({
  selector: 'app-military-area',
  templateUrl: './military-area.component.html',
  styleUrls: ['./military-area.component.scss']
})
export class MilitaryAreaComponent extends SettingTemplate implements OnInit {

  govers: any = [];

  constructor(public settingService: SettingService, private applicationSettingService: ApplicationSettingService) {
    super(settingService);
    this.baseUrl = "military_areas";
    this.requiredFields = ['name', 'government_id'];
    this.get();
  }

  ngOnInit() {
      this.applicationSettingService.getGovernments().subscribe((res: any) => {
          this.govers = res;
      });
  }


  action() {
    this.get();
  }

}
