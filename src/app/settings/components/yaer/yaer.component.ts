import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-yaer',
  templateUrl: './yaer.component.html',
  styleUrls: ['./yaer.component.scss']
})
export class YaerComponent extends SettingTemplate implements OnInit   {

  
  constructor(public settingService: SettingService , public globalService : GlobalService) {
    super(settingService);
    this.baseUrl = "academic_years";
    this.requiredFields = ['start_date', 'end_date'];
    this.get();
  }

  
  sendactive(item_id : number){
    this.globalService.store('update-system-setting-year' , {year_id : item_id}).subscribe((res) => {
      
      setTimeout(() => 
      {
      location.reload(); 
      }, 1000);
      return Message.success(Helper.trans('  تم الحفظ بنجاح'));
  
      },err => {
        console.log(err);
        return Message.error("حدث خطا ما")
      })
  }


  ngOnInit() {
  }

}
