import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { Message } from 'src/app/shared/message';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AppModule } from 'src/app/app.module';
import { Helper } from 'src/app/shared/helper';
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  public doc: any = AppModule.doc;

  public isSubmitted = false;

  @Input() updateResources: any;
  @Input() updateMode: any = false;
  @Input() item: any = {};

  constructor(private globalService: GlobalService) {
    this.reset();
  }

  reset() {
    if (this.updateMode)
      return;
    this.item = {
      value: 0
    };
  }

  validate() {
    let valid = true;
    if (
      !this.item.name
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
    this.globalService.store("account/companies/store", this.item).subscribe((res) => {
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
    this.globalService.update("account/companies/update/"+ this.item.id ,Helper.toFormData(this.item)).subscribe((res) => {
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
