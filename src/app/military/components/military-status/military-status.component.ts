import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/settings/services/setting.service';
import { SettingTemplate } from 'src/app/settings/setting-template';

@Component({
  selector: 'app-military-status',
  templateUrl: './military-status.component.html',
  styleUrls: ['./military-status.component.scss']
})
export class MilitaryStatusComponent extends SettingTemplate implements OnInit {


  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "military_status";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
