import { Component, OnInit, ViewChild } from '@angular/core';
import { HashTable } from 'angular-hashtable';
 import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
 import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { Message } from 'src/app/shared/message';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';
import { GlobalService } from 'src/app/shared/services/global.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-studentsefy',
  templateUrl: './studentsefy.component.html',
  styleUrls: ['./studentsefy.component.scss']
})
export class StudentsefyComponent implements OnInit {

  constructor(private globalService: GlobalService) {
    this.localCompleteDate = new Date();

    this.dated = this.localCompleteDate.toISOString();
    this.dated = this.dated.substring(0, this.dated.length - 1);

   }
   localCompleteDate
   dated
  ngOnInit() {
    this.search()
    // this.ShowStudentrecords()
  }
  studentDataSummer=[]
  ShowStudentrecords(){
    this.studentDataSummer=[]

    this.globalService.get('academic/summer/courses/reports/get').subscribe( (res: any) => {

      this.studentDataSummer=res

    });
  }
  formdata={}
  search(){
    this.studentDataSummer=[]
this.formdata={
  "date":formatDate(this.dated,'yyyy-MM-dd','en-US')

}
    this.globalService.get('academic/summer/courses/reports/get-by-date',this.formdata).subscribe( (res: any) => {

      this.studentDataSummer=res

    });
  }
}
