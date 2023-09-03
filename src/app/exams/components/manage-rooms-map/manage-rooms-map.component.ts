import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';
import { TermService } from '../../../account/services/term.service';

@Component({
  selector: 'app-manage-rooms-map',
  templateUrl: './manage-rooms-map.component.html',
  styleUrls: ['./manage-rooms-map.component.scss']
})
export class ManageRoomsMapComponent implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  terms: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  start_number: any;
  level_id: any;
  commissionsGet: any;
  theatersGet: any;
  commission_id: any;
  theater_id: any;
  term_id: any;
  year_id: any;
  student_distributions_number: any;
  student_distribution_id: any;


  constructor(
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });
      this.applicationSettingService.student_distributions_number().subscribe((res)=>{
        this.student_distributions_number = res;
      })


    }
  calculateCount() {
    this.$('#count').text(this.$('#reportContent tbody tr').length);
  }

  load() {
    //if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academic_year_id'])) {
    //  return Message.error(Helper.trans('please choose all filters'));
    //}

    this.globalService.loadHtml("affair/report3", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
      this.calculateCount();
    });
  }
  sendNumber(){
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = {level_id: this.level_id , set_number: this.start_number , theater_id : this.theater_id , term_id: this.term_id , commission_id: this.commission_id , year_id: this.year_id , student_distribution_id: this.student_distribution_id};
    console.log(objectSend)
    if(this.start_number == undefined || this.theater_id == undefined || this.term_id == undefined  || this.commission_id == undefined ||  this.year_id == undefined || this.student_distribution_id == undefined){
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
    } else {
      this.applicationSettingService.student_distributions(objectSend).subscribe((res)=>{
        if(res == 1){
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumberSuccess').slideUp(1000);
        $('#closeNumber').trigger('click');
        this.level_id = '';
        this.start_number = '';
        this.student_distribution_id = '';

        this.year_id = '';
        this.commission_id = '';

        this.term_id = '';
        this.theater_id = '';

      }, 1000);
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
        }
      })
    }
  }

  printContent() {
    this.doc.printJs();
  }

  submitData()
  {
    // if (!Helper.validator(this.filter, [ 'year_id' ])) {
    //   return Message.error(Helper.trans('اختر السنه اولا'));
    // }
    // else
    //{
      Message.confirm(Helper.trans('are you sure'), () =>
     {
      this.applicationSettingService.student_distributions(this.filter).subscribe((res)=>
      {
        if(res == 1)
              { return Message.success(Helper.trans('done'));} 
        else  {return Message.error('تم التوزيع من قبل');}
      })
     }
     );
   // }
   
  }

  submitDataTakhlfat()
  {

      Message.confirm(Helper.trans('are you sure'), () =>
     {
      this.applicationSettingService.student_distributionsTakhlfat(this.filter).subscribe((res)=>
      {
        if(res == 1)
              { return Message.success(Helper.trans('done'));} 
        else  {return Message.error('تم التوزيع من قبل');}
      })
     }
     );
   
  }


  submitDataNo(){
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.student_distributionsNo(1).subscribe((res)=>{
        if(res == 1){
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error('تم التوزيع من قبل');
        }
      })
    });
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.applicationSettingService.theaters().subscribe((res)=>{
      this.theatersGet = res;
    })
    this.applicationSettingService.commissions().subscribe((res)=>{
      this.commissionsGet = res;
    })
  }
}
