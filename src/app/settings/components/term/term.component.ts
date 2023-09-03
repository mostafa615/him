import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';
import { TermService } from 'src/app/account/services/term.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent  extends SettingTemplate implements OnInit {

  id_current:any ;
  
  terms: any = [];

  constructor(public settingService: SettingService ,private termService:TermService
    ) {
    super(settingService);
    this.baseUrl = "update-system-setting-term";
    this.requiredFields = ['start_date', 'end_date'];
    this.get();

    this.settingService.getTerm().subscribe((res:any)=>{
      this.id_current = res.id;
    })

  }
  sendactive(data:any){
    this.settingService.updateTermActive({term_id:data}).subscribe((res:any)=>{
    if(res.status == 1)
    {
    setTimeout(() => 
    {
    location.reload(); 
    }, 1000);
        return Message.success(Helper.trans('  تم الحفظ بنجاح'));
      }
      else{
        return Message.error(Helper.trans('يرجى اعاده المحاوله'));

    }
    })
  }

  ngOnInit() {
    this.terms = Cache.get(TermService.TERPM_PREFIX);

  }


  action() {
    this.get();
  }
}
