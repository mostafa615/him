import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';
import { TermService } from 'src/app/account/services/term.service';
@Component({
  selector: 'app-group-course',
  templateUrl: './group-course.component.html',
  styleUrls: ['./group-course.component.scss']
})
export class GroupCourseComponent implements OnInit {

  filter: any = {};
  filterUpdate: any = [];
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  terms: any = [];
  doc: any = document;
  group: any;
  prevgroups: any;
  currentgroupName: any;
  currentgroupId: any;
  isSubmitted: any;
  constructor(
    private globalService: GlobalService,
    private termService:TermService,
    private applicationSettingService: ApplicationSettingService) {
    this.applicationSettingService.queueRequests();
    var self = this;
    Request.fire(false, () => {
    });


  }

  load() {
    if (!Helper.validator(this.filter, ['level_id' , 'academic_year_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    }

    this.globalService.loadHtml("affair/report4", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
    });
  }

  creategroup() {
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = { name: this.filter.name , term_id: this.filter.term_id , level_id: this.filter.level_id , year_id: this.filter.academic_id };
    console.log(objectSend)
    if (this.filter.name == undefined || this.filter.name == null || this.filter.name == '' || this.filter.term_id == undefined || this.filter.term_id == null || this.filter.term_id == '' || this.filter.academic_id == undefined || this.filter.academic_id == null || this.filter.academic_id == '' || this.filter.level_id == undefined || this.filter.level_id == null || this.filter.level_id == '' ) {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));

    } else {
      this.applicationSettingService.groupStore(objectSend).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();

          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber1').trigger('click');
            this.filter.name = '';


          }, 1000);
          this.applicationSettingService.groups().subscribe((res: any) => {
            this.prevgroups = res;
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
  setCurrent(data: any) {
    this.currentgroupId = data.id;
    this.filterUpdate = data;
  }
  updategroup(name, id) {
    console.log(name);
    console.log(id);

    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = { name: this.filterUpdate.name, id: this.currentgroupId , term_id: this.filterUpdate.term_id , level_id: this.filterUpdate['level_id'] , year_id: this.filterUpdate.year_id };

    console.log(objectSend)
    if (this.filterUpdate.name == undefined || this.currentgroupId == undefined || this.filterUpdate.name == null || this.currentgroupId == null || this.filterUpdate.name == '' || this.currentgroupId == '' ) {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));

    } else {
      this.applicationSettingService.groupEdit(objectSend).subscribe((res) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();

          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber2').trigger('click');
            this.filterUpdate.name = '';


          }, 1000);
          this.applicationSettingService.groups().subscribe((res: any) => {
            this.prevgroups = res;
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
  destroygroup(id: any) {
    // console.log(id);
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.groupDestroy(id).subscribe((res: any) => {
        if (res == 1) {
          this.applicationSettingService.groups().subscribe((res: any) => {
            this.prevgroups = res;
          })
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error(Helper.trans('failed'));

        }
      })
    });
    this.applicationSettingService.groups().subscribe((res: any) => {
      this.prevgroups = res;
    })
  }
  printContent() {
    this.doc.printJs();
  }

  ngOnInit() {
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    // this.globalService.loadHtml("affair/report6", this.filter).subscribe((res) => {
    //   $('#reportContent').html(res);
    // });
    this.applicationSettingService.groups().subscribe((res: any) => {
      this.prevgroups = res;
      console.log(res);
    })
  }
}
