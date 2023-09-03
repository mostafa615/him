import { Component, OnInit } from '@angular/core';
import { DivisionService } from 'src/app/account/services/division.service';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';

@Component({
  selector: 'app-set-numbers-null',
  templateUrl: './set-numbers-null.component.html',
  styleUrls: ['./set-numbers-null.component.scss']
})

export class SetNumbersNullComponent implements OnInit {
  filter: any = {};
  levels: any = [];
  level_id: any;
  constructor(
    private applicationSettingService: ApplicationSettingService
  ) { }

  setNumbersNull() {
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.setNumbersNull(this.filter).subscribe((res: any) => {
        if (res == 1) {
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error(Helper.trans('failed'));
        }
      })
    });
  }
  ngOnInit() {
    $('#level_id').on('change' , ()=>{
      this.level_id = $('#level_id').val();
    })
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);

  }

}
