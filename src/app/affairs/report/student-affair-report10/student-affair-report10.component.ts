import { Component, OnInit } from '@angular/core';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-student-affair-report10',
  templateUrl: './student-affair-report10.component.html',
  styleUrls: ['./student-affair-report10.component.scss']
})
export class StudentAffairReport10Component implements OnInit {

  filter: any = {};
  $: any = $;
  governments: any = [];
  applicationService: any = ApplicationSettingService;

  doc: any = document;

  constructor(private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });
     }

    printContent() {
      this.doc.printJs();
    }
    load() {
      if (!Helper.validator(this.filter, ['government_id'])) {
        return Message.error(Helper.trans('please choose all filters'));
      }

      this.globalService.loadHtml("affair/report10", this.filter).subscribe((res) => {
        $('#reportContent').html(res);
      });
    }
  ngOnInit() {
  }

}
