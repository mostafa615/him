import { Component, OnInit, ViewChild } from '@angular/core';
import { HashTable } from 'angular-hashtable';
 import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
 import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { Message } from 'src/app/shared/message';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';
import { GlobalService } from 'src/app/shared/services/global.service';
@Component({
  selector: 'app-notiftransform',
  templateUrl: './notiftransform.component.html',
  styleUrls: ['./notiftransform.component.scss']
})
export class NotiftransformComponent implements OnInit {



  // services list
  public resources: any[] = [];

  // init breadcrum
  public breadcrumbList = [];

  // show create modal
  public showCreateModal = false;

  // remove options
  public showRemoveButton = false;
  public showRemoveModal = false;
  public trashList = new HashTable<any, any>();
  public removed = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.resources);
  displayedColumns: string[];

  // update resouce
  updateResources: any;
  updateItem: any = {};

  constructor(private globalService: GlobalService) {
    this.init();
  }

  init() {
    this.initBreadcrumb();
    this.initDisplayColumns();
    //
    this.updateResources = () => {
      this.loadResources(1);
    };
  }

  initMatDatatable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  initBreadcrumb() {
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: ' اشعارات التحويلات المالية'}
    ];
  }

  initDisplayColumns() {
    this.displayedColumns = [
      'date',
      'value',
      'bank_id',
      'store_id',
      'action'
    ];
  }

  refreshDataSource(data: any[]) {

    this.resources = data;
    this.dataSource.data = data;
  }

  toggleFromTrash(id) {
    if (this.trashList.has(id)) {
      this.trashList.remove(id);
    }
    else {
      this.trashList.put(id, id);
    }

    if (this.trashList.size() > 0)
      this.showRemoveButton = true;
    else
      this.showRemoveButton = false;
  }

display="none"
labelx="التحويلات الجديدة"
flgg=1
  loadResources(flag) {
    this.resources=null
this.flgg=flag
    this.globalService.get("account/requests/"+flag).subscribe( (res: any) => {
      this.refreshDataSource(res);
    });

    if(this.flgg==1){
      this.labelx="التحويلات الجديدة"

    }else if(this.flgg==2){
      this.labelx="التحويلات المقبولة"

    }else{
      this.labelx="التحويلات المرفوضة"

    }
  }
  submit1(){
    this.globalService.store('account/requests/accept',this.dataAccept).subscribe((res) =>  {
      Message.success("تم القبول بنجاح");
      this.display="none"

      this.loadResources(1)
    }

     );
  }
  dataAccept :any = {};
  rejectAccept :any = {};
balance
balance2
  accept(id) {
    this.balance=null
    let  data: any = {};
   data.api_token= Auth.getApiToken();
   data.request_id= id.id;
   this.dataAccept=data
   this.balance=id.transformation["value"]
   this.display="block"


    // this.globalService.store("account/requests/accept",id).subscribe( (res: any) => {
    //  });
  }
  submit2(){
    this.globalService.store('account/requests/cancel',this.rejectAccept).subscribe((res) =>  {
      Message.success("تم الرفض بنجاح");
      this.loadResources(1)
      this.display2="none"

    });
  }
  onCloseModal(){
    this.display="none"
  }
  display2="none"
  onCloseModal2(){
    this.display2="none"
  }
  reject(id) {
    this.balance2=null
    let  data: any = {};
    data.api_token= Auth.getApiToken();
    data.request_id= id.id;
    this.rejectAccept=data
    this.balance2=id.transformation["value"]

   this.display2="block"


  }

  ngOnInit() {
    this.initMatDatatable();
    this.loadResources(1);
  }


}
