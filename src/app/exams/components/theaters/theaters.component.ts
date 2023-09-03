import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';
@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss']
})
export class TheatersComponent implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  theater: any;
  prevTheaters: any;
  currentTheaterName: any;
  currentTheaterId: any;
  isSubmitted: any;
  constructor(
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
    this.applicationSettingService.queueRequests();
    var self = this;
    Request.fire(false, () => {
    });


  }

  load() {
    if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academic_year_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    }

    this.globalService.loadHtml("affair/report4", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
    });
  }

  createTheater() {
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = { name: this.theater };
    console.log(objectSend)
    if (this.theater == undefined || this.theater == null || this.theater == '') {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));

    } else {
      this.applicationSettingService.theaterStore(objectSend).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();

          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber1').trigger('click');
            this.theater = '';


          }, 1000);
          this.applicationSettingService.theaters().subscribe((res: any) => {
            this.prevTheaters = res;
          })
          return Message.success(Helper.trans('done'));
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          setTimeout(() => {
            $('#alertNumber').slideUp(1000);
          }, 1000);
          return Message.error(Helper.trans('failed'));

        }
      })
    }
  }
  setCurrent(name: any, id: any) {
    this.currentTheaterName = name;
    this.currentTheaterId = id;
  }
  updateTheater(name, id) {
    console.log(name);
    console.log(id);

    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = { name: this.theater, id: this.currentTheaterId };
    console.log(objectSend)
    if (this.theater == undefined || this.currentTheaterId == undefined || this.theater == null || this.currentTheaterId == null || this.theater == '' || this.currentTheaterId == '') {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));

    } else {
      this.applicationSettingService.theaterEdit(objectSend).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();

          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber2').trigger('click');
            this.theater = '';


          }, 1000);
          this.applicationSettingService.theaters().subscribe((res: any) => {
            this.prevTheaters = res;
          })
          return Message.success(Helper.trans('done'));
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          setTimeout(() => {
            $('#alertNumber').slideUp(1000);
          }, 1000);
          return Message.error(Helper.trans('failed'));

        }
      })
    }
  }
  destroyTheater(id) {
    // console.log(id);
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.theaterDestroy(id).subscribe((res: any) => {
        if (res == 1) {
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error(Helper.trans('failed'));

        }
      })
      this.applicationSettingService.theaters().subscribe((res: any) => {
        this.prevTheaters = res;
      })
    });
    this.applicationSettingService.theaters().subscribe((res: any) => {
      this.prevTheaters = res;
    })
  }
  printContent() {
    this.doc.printJs();
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    // this.globalService.loadHtml("affair/report6", this.filter).subscribe((res) => {
    //   $('#reportContent').html(res);
    // });
    this.applicationSettingService.theaters().subscribe((res: any) => {
      this.prevTheaters = res;
    })
  }
}
