import { Component, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { LevelService } from 'src/app/account/services/level.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { AcademicSettingService } from '../../services/academic-setting.service';

@Component({
  selector: 'app-academic-setting',
  templateUrl: './academic-setting.component.html',
  styleUrls: ['./academic-setting.component.scss']
})
export class AcademicSettingComponent implements OnInit {

  $: any = $;
  settings = [];
  levels = [];
  settingHash = new HashTable();
  rPaymentSettings = new HashTable();
  unrPaymentSettings = new HashTable();
  isSubmitted = false;
  password: any = null;
  level_id: any = null;
  action = null;

  constructor(private academicSettingService: AcademicSettingService) {
    this.initSettings();
  }

  ngOnInit() {
    this.loadSettings();
    this.loadLevels();
  }

  loadLevels() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

  initSettings() {
 
    this.settings = [
      {id: 1, value: this.settingHash.get(1)},
      {id: 2, value: this.settingHash.get(2)},
      {id: 3, value: this.settingHash.get(3)},
      {id: 4, value: this.settingHash.get(4)},
      {id: 5, value: this.settingHash.get(5)},
      {id: 6, value: this.settingHash.get(6)},
      {id: 7, value: this.settingHash.get(7)},
      {id: 8, value: this.settingHash.get(8)},
      {id: 9, value: this.settingHash.get(9)},
      {id: 10, value: this.settingHash.get(10)},
      {id: 11, value: this.settingHash.get(11)},
      {id: 12, value: this.settingHash.get(12)},
      {id: 13, value: this.settingHash.get(13)},
        //r payment settings
      {id: 14, value: this.rPaymentSettings.get(1) || 0},
      {id: 15, value: this.rPaymentSettings.get(2) || 0},
      {id: 16, value: this.rPaymentSettings.get(3) || 0},
      {id: 17, value: this.rPaymentSettings.get(4) || 0},
      {id: 18, value: this.rPaymentSettings.get(5) || 0},
      //unr payment settings
      {id: 19, value: this.unrPaymentSettings.get(6) || 0},
      {id: 20, value: this.unrPaymentSettings.get(7) || 0},
      {id: 21, value: this.unrPaymentSettings.get(8) || 0},
      {id: 22, value: this.unrPaymentSettings.get(9) || 0},
      {id: 23, value: this.unrPaymentSettings.get(10) || 0}
    ];
    
    console.log(this.settings);
    
  }

  /**
   * load all academic settings
   */
  loadSettings() {
    this.settingHash = new HashTable();
    this.academicSettingService.get().subscribe((res: any) => {
      res.forEach(element => {
        this.settingHash.put(element.id, element.value);
      });
      this.getPaymentSettings();

    });
  }

  /**
   * update all settings of academic
   */
  updateSetting() {

    const academicWithoutPaymentSettingsLength = 13
    let data = {
      settings: this.settings.slice(0 , academicWithoutPaymentSettingsLength)
    };
    const paymentData = this.settings.slice(academicWithoutPaymentSettingsLength , this.settings.length)
    
    const paymentSettings = []

    paymentData.forEach(element => {
      element.id = element.id - data.settings.length
      paymentSettings.push(element)
    });


    this.isSubmitted = true;
    this.academicSettingService.update(data).subscribe((res: any) => {
      if (res.status == 1)
        Message.success(res.message);
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });

    this.academicSettingService.updatePaymentSettings(paymentSettings).subscribe(res => {
    })
  }

  getPaymentSettings(){
    this.academicSettingService.getAcademicPaymentSettings().subscribe((res : any) => {
      const r = res.restricted;
      const unr = res.unrestricted;
      r.forEach(i => {
        this.rPaymentSettings.put(i.id , i.value)
      })
      unr.forEach(i => {
        this.unrPaymentSettings.put(i.id , i.value)
      })

      this.initSettings();

    })
  }

  /**
   * update all settings of academic
   */
  publishResult() {
    if (!this.password || !this.level_id) {
      return Message.error(Helper.trans('fill all data'));
    }

    let data = {
      action: this.action,
      level_id: this.level_id,
      password: this.password
    };
    this.isSubmitted = true;
    this.academicSettingService.updatePublishResult(data).subscribe((res: any) => {
      if (res.status == 1)
        Message.success(res.message);
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  /**
   * show modal of publish result
   *
   */
  showPublishResultModal(action) {
    this.action = action;
    this.$('#publishResultModal').modal('show');
  }

}
