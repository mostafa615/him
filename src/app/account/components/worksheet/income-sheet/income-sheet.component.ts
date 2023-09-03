import { Component, OnInit, ViewChild } from '@angular/core';
import jexcel from "jexcel";
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { DivisionService } from 'src/app/account/services/division.service';
import { LevelService } from 'src/app/account/services/level.service';
import { Cache } from 'src/app/shared/cache';

@Component({
  selector: 'app-income-sheet',
  templateUrl: './income-sheet.component.html',
  styleUrls: ['./income-sheet.component.scss']
})
export class IncomeSheetComponent implements OnInit {

  filter: any = {};
  data: any = [];
  expenses: any = [];
  stores: any = [];
  loading = false;
  total = 0;
  dataLength: any
  page: Number
  levels: any;
  divisions: any;

  constructor(private globalService: GlobalService) {
    this.filter.store_id = 0;
  }

  ngOnInit() {
    this.globalService.get('account/stores', this.filter).subscribe((res) =>{
      this.stores = res;
    });
    this.loadData();
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
  }

  loadData() {
    if (!this.filter.store_id || !this.filter.date_from || !this.filter.date_to)
      return;
    // if (!this.filter.store_id)
    //   return;
    this.loading = true;
    this.globalService.get('account/incomes', this.filter).subscribe((res:any) =>{
      this.data = res;
      this.dataLength = res.length
      this.calculateTotal();
      this.create('');
      this.loading = false;
    });
  }

  sendExpense(object: any) {
    if (object.id)
      this.updateExpense(object);
    else
      this.createExpense(object);
  }

  updateExpense(object: any) {
    /*this.globalService.store('account/incomes/update/'+object.id, object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
    });*/
  }

  createExpense(object: any) {
    /*this.globalService.store('account/incomes/store', object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
      //this.create('');
    });*/
  }

  create(text=null) {
    /*this.data.push({
      notes: text,//? text : Helper.trans('new expense')
      type: 'store',
      store_id: this.filter.store_id
    });*/
  }

  remove(object: any, index) {
    /*var self = this;
    Message.confirm(Helper.trans('are you sure'), (res) => {
      self.globalService.store('account/incomes/delete/'+object.id, object).subscribe((res: any) => {
        self.data.splice(index, 1);
        self.loadData();
      });
    });*/
  }

  calculateTotal() {
    this.total = 0;
    this.data.forEach(element => {
      this.total += element.value;
    });
  }

}
