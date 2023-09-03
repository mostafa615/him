import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';
@Component({
  selector: 'app-commission-types',
  templateUrl: './commission-types.component.html',
  styleUrls: ['./commission-types.component.scss']
})
export class CommissionTypesComponent extends SettingTemplate implements OnInit {

  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "commission_types";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
