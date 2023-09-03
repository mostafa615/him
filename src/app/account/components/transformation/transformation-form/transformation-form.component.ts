import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module';
import { Auth } from '../../../../shared/auth';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-transformation-form',
  templateUrl: './transformation-form.component.html',
  styleUrls: ['./transformation-form.component.scss']
})
export class TransformationFormComponent implements OnInit {


  public doc: any = AppModule.doc;

  public isSubmitted = false;

  @Input() updateResources: any;
  @Input() updateMode: any = false;
  @Input() item: any = {};

  banks: any = [];
  stores: any = [];
  helper: any = Helper;

  localCompleteDate
  constructor(private globalService: GlobalService) {
    this.reset();
    this.localCompleteDate = new Date();

    this.item.date = this.localCompleteDate.toISOString();
    this.item.date = this.item.date.substring(0, this.item.date.length - 1);
  }

  reset() {
    if (this.updateMode)
      return;
    this.item = {
      value: 0
    };
    this.localCompleteDate = new Date();

    this.item.date = this.localCompleteDate.toISOString();
    this.item.date = this.item.date.substring(0, this.item.date.length - 1);
  }

  validate() {
    let valid = true;
    if (!Helper.validator(this.item, ['date', 'type', 'value', 'store_id', 'bank_id','notes','transformation_type']))
      valid = false;

    return valid;
  }

  ngOnInit() {
    // this.globalService.get('account/banks').subscribe((res) => {
    //   this.banks = res;
    // });


    // this.globalService.get('account/stores').subscribe((res) => {
    //   this.stores = res;
    // });
  }

  onchange(type){

    this.banks=[]
    this.stores=[]
    let  data: any = {};
   data.api_token= Auth.getApiToken();
   data.type= type;

    this.globalService.get2('account/transformations/get-by-type',data).subscribe((res) =>  {
       for (var x in res){
         res.hasOwnProperty(x) && this.banks.push(res[x])
      }
    }

     );
  console.log(this.banks)
  }
  onchange2(event,typeBank,typeTrans){
this.stores=[]
    let  data: any = {};
    data.api_token= Auth.getApiToken();
    data.type= typeBank;
    data.transformation_type= typeTrans;

    // this.globalService.get('account/transformation/get-by-transformation-type').subscribe((res) => {
    //   this.stores = res;
    // });
     this.globalService.get2('account/transformations/get-by-transformation-type',data).subscribe((res) =>  {
      for (var x in res){
        res.hasOwnProperty(x) && this.stores.push(res[x])
     }
   }

    );
  }
  sendResource() {
    console.log(this.item);
    if (this.updateMode)
      this.updateResource();
    else
      this.addResource();
  }

  addResource() {
    if (!this.validate())
      return Message.error('please fill all data');

    this.isSubmitted = true;
    this.globalService.store("account/transformations/store", Helper.toFormData(this.item)).subscribe((res) => {
      const r: any = res;
      if (r.status == 1) {
        Message.success(r.message);
      }
      else
        Message.error(r.message);

      if (r.status == 1) {
        this.reset();
        this.banks=[]
        this.stores=[]
        this.updateResources();
      }

      this.isSubmitted = false;
    });
  }

  updateResource() {
    if (!this.validate())
      return Message.error('please fill all data');

    this.isSubmitted = true;
    this.globalService.update("account/transformations/update/"+this.item.id, Helper.toFormData(this.item)).subscribe((res) => {
      const r: any = res;
      if (r.status == 1) {
        Message.success(r.message);
      }
      else
        Message.error(r.message);

      if (r.status == 1) {
        this.updateResources();
      }

      this.isSubmitted = false;
    });
  }
}
