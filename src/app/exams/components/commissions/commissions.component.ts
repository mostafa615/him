import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit {

  filter: any = {};
  filterCommission: any = {};
  isSubmitted: any;
  filterUpdate: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  commissions: any;
  commision_types: any;
  prevCommissions: any;
  commission: any;
  currentCommissionName: any;
  currentCommissionId: any;
  prevTheaters: any;
  constructor(
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
    this.applicationSettingService.queueRequests();
    var self = this;
    Request.fire(false, () => {
    });
    this.applicationSettingService.commision_types().subscribe((res: any) => {
      this.commision_types = res;
    })


  }

  createCommission() {
    if (!Helper.validator(this.filter, ['level_id', 'division_id', 'theater_id' , 'max_num' , 'commission_number' , 'commission_type_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    } else {
      $('#beforeLoading').hide();
      $('#buttonLoading').show();
      this.applicationSettingService.commissionsStore(this.filter).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          this.applicationSettingService.commissions().subscribe((res: any) => {
            this.prevCommissions = res;
          })
          return Message.success(Helper.trans('done'));
        } else {
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          return Message.error(Helper.trans('failed'));
        }
      })
    }
  }
  updateCommission(){
    if (!Helper.validator(this.filterUpdate, ['level_id', 'division_id', 'theater_id' , 'max_num' , 'name' , 'commission_type_id' ])) {
      return Message.error(Helper.trans('please choose all filters'));
    } else {

      $('#beforeLoading0').hide();
      $('#buttonLoading0').show();
      this.applicationSettingService.commissionEdit(this.filterUpdate).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading0').show();
          $('#buttonLoading0').hide();
          this.applicationSettingService.commissions().subscribe((res: any) => {
            this.prevCommissions = res;
          })
          return Message.success(Helper.trans('done'));
        } else {
          $('#beforeLoading0').show();
          $('#buttonLoading0').hide();
          return Message.error(Helper.trans('failed'));
        }
      })
    }
  }

  destroyCommission(id) {
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.commissionDestroy(id).subscribe((res: any) => {
        if (res == 1) {
          this.applicationSettingService.commissions().subscribe((res: any) => {
            this.prevCommissions = res;
          })
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error(Helper.trans('failed'));

        }
      })
    });
  }

  setCommissionsNull() {
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.setCommissionsNull(this.filterCommission).subscribe((res: any) => {
        if (res == 1) {
          this.applicationSettingService.commissions().subscribe((res: any) => {
            this.prevCommissions = res;
          })
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error(Helper.trans('failed'));

        }
      })
    });
  }

  setCurrent(data: any) {
    this.filterUpdate = data;
  }

  printContent() {
    this.doc.printJs();
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    // this.globalService.loadHtml("affair/report4", this.filter).subscribe((res) => {
    //   $('#reportContent').html(res);
    // });
    this.applicationSettingService.commissions().subscribe((res: any) => {
      this.prevCommissions = res;
    })
    this.applicationSettingService.theaters().subscribe((res: any) => {
      this.prevTheaters = res;
    })
  }
}
