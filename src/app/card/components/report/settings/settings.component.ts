import { Component, OnInit } from "@angular/core";
import { HashTable } from "angular-hashtable";
import { LevelService } from "src/app/account/services/level.service";
import { CardService } from "src/app/card/services/card.service";
import { Cache } from "src/app/shared/cache";
import { ApplicationSettingService } from "src/app/adminision/services/application-setting.service";

import { Helper } from "src/app/shared/helper";
import { Message } from "src/app/shared/message";
import { SystemSettingService } from "src/app/core/services/system-setting.service";
import { TermService } from "src/app/account/services/term.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  $: any = $;
  globalSetting: any = {};
  filter: any = {};
  settings = [];
  levels = [];
  valuesHash = new HashTable();
  terms: any = [];
  term_id: any;

  isSubmitted = false;
  password: any = null;
  level_id: any = null;
  action = null;
  applicationService: any = ApplicationSettingService;

  constructor(
    private cardService: CardService,
    private systemSettingService: SystemSettingService
  ) {}
  ngOnInit(){

    this.loadGlobalSettings();
    this.filter.year_id = this.applicationService.cue
  }

  loadLevels() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

  getSettingObject(case_constraint_id, valuesHashIndex, level_id) {
    return {
      academic_year_id: this.filter.year_id,
      level_id,
      term_id: this.filter.term_id,
      case_constraint_id : case_constraint_id.toString() ,
      value: this.valuesHash.get(valuesHashIndex) || 0,
    };
  }
  initSettingsValues() {
    this.valuesHash.getKeys().forEach(key => this.valuesHash.remove(key))
  }
  loadSettings(
    year_id ,
    term_id
  ) {
    this.initSettingsValues()
    this.cardService.getSettings({ year_id, term_id }).subscribe((res: any) => {
      res.forEach((row) => {
        console.log(row);
        if (row.case_constraint_id == 2) {
          this.valuesHash.put(row.level_id, row.value);
        } else {
          this.valuesHash.put(row.level_id + 5, row.value);
        }
      });

      this.settings = [
        // مقيد
        this.getSettingObject(2, 1, 1),
        this.getSettingObject(2, 2, 2),
        this.getSettingObject(2, 3, 3),
        this.getSettingObject(2, 4, 4),
        this.getSettingObject(2, 5, 5),

        // غير مقيد
        this.getSettingObject(3, 6, 1),
        this.getSettingObject(3, 7, 2),
        this.getSettingObject(3, 8, 3),
        this.getSettingObject(3, 9, 4),
        this.getSettingObject(3, 10, 5),
      ];
    });
  }

  loadGlobalSettings() {
    this.systemSettingService.getSystemSetting().subscribe((res: any) => {
      this.globalSetting = res;
      this.filter.year_id = res.current_academic_year.id
      this.filter.term_id = res.current_term.id
      this.loadSettings(this.filter.year_id, this.filter.term_id);
    });
  }


  updateSetting(){
    
    this.cardService.updateSettings({settings: this.settings}).subscribe(res => {
      Message.success("تم الحفظ")
    })
  }}
