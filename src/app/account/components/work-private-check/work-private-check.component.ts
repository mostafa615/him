import { Component, OnInit, ViewChild } from '@angular/core';
import jexcel from "jexcel";
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-work-private-check',
  templateUrl: './work-private-check.component.html',
  styleUrls: ['./work-private-check.component.scss']
})
export class WorkPrivateCheckComponent implements OnInit {
  $: any = $;
  filter: any = {};
  data: any = [];
  banks: any = [];
  resources: any = [];
  loading = false;
  total = 0;
  persons: any =[];
  companies: any =[];
  person_id:any;
  company_id:any;
  // comp:any;
  constructor(private globalService: GlobalService) {
    this.filter.bank_id = 0;
  }

  ngOnInit() {
    var self = this;
    // set select2
    setTimeout(() => {
      this.$('.select2').select2();
    }, 500);
    $('#person_id').on('select2:select', function (e: any) {
      self.person_id = $('#person_id').val();
    });
    $('#company_id').on('select2:select', function (e: any) {
      self.company_id = $('#company_id').val();
    });
    this.globalService.get('account/banks', this.filter).subscribe((res) =>{
      this.banks = res;
    });
    this.globalService.get('account/companies').subscribe((res) => {
      this.companies = res;      
    });
    this.globalService.get('account/persons').subscribe((res) => {
      this.persons = res;      
    });
    this.loadData();
  }

  loadData() {
    if (!this.filter.bank_id && !this.filter.person_id)
      return;
    this.loading = true;
    this.globalService.get('account/checks', this.filter).subscribe((res) =>{
      this.company_id = "company_id";
      this.data = res;
      this.calculateTotal();
      this.create('');
      this.loading = false;
    });
  }


  getIndexWithId(id) {
    this.data.forEach((element, index, arr) => {
      if (element.id == id)
        return index;
    });

    return null;
  }

  sendResource(object: any) {
    if (!this.validate(object))
      return;
    if (object.id)
      this.updateResource(object);
    else
      this.createResource(object);
  }

  validate(object: any) {
    return (this.filter.bank_id && object.bank_id && this.filter.person_id && object.person_id && object.date && object.value);
  }

  updateResource(object: any) {
    this.globalService.store('account/checks/update/'+object.id, object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
      else
        Message.error(res.message);
    });
  }

  createResource(object: any) {
    this.globalService.store('account/checks/store', object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
      else
        Message.error(res.message);
      //this.create('');
    });
  }

  create(text=null) {
    this.data.push({
      notes: text,
      
      person_id: this.filter.person_id,

      bank_id: this.filter.bank_id
    });
  }

  remove(object: any, index) {
    var self = this;
    Message.confirm(Helper.trans('are you sure'), (res) => {
      self.globalService.store('account/checks/delete/'+object.id, object).subscribe((res: any) => {
        self.data.splice(index, 1);
        self.loadData();
      });
    });
  }

  calculateTotal() {
    this.total = 0;
    this.data.forEach(element => {
      this.total += element.value;
    });
  }

}
