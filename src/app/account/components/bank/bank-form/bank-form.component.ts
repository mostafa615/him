import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module';
import { Auth } from '../../../../shared/auth';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.scss']
})
export class BankFormComponent implements OnInit {


  public doc: any = AppModule.doc;

  public isSubmitted = false;

  @Input() updateResources: any;
  @Input() updateMode: any = false;
  @Input() item: any = {};

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
    if (
      !this.item.name ||!this.item.notes
    )
      valid = false;
    return valid;
  }

  ngOnInit() {
  }

  sendResource() {
    if (this.updateMode)
      this.updateResource();
    else
      this.addResource();
  }

  addResource() {
    if (!this.validate())
      return Message.error('please fill all data');

    this.isSubmitted = true;
    this.globalService.store("account/banks/store", this.item).subscribe((res) => {
      const r: any = res;
      if (r.status == 1) {
        Message.success(r.message);
      }
      else
        Message.error(r.message);

      if (r.status == 1) {
        this.reset();
        this.updateResources();
      }

      this.isSubmitted = false;
    });
  }

  updateResource() {
    if (!this.validate())
      return Message.error('please fill all data');

    this.isSubmitted = true;
    this.globalService.update("account/banks/update/"+ this.item.id ,Helper.toFormData(this.item)).subscribe((res) => {

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
