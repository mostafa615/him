import { Message } from './../../../../shared/message';
import { Auth } from './../../../../shared/auth';
import { StudentAccountService } from './../../../services/student-account.service';
import { Component, OnInit, SimpleChanges, OnChanges, Input, Output } from '@angular/core';
import { Helper } from '../../../../shared/helper';
import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.scss']
})
export class InstallmentComponent implements OnInit {
  current_model_id:any;
  model_id:any;
  commission_id:any;
  item:any;

  public doc: any = AppModule.doc;
  public total1: number = 0;
  public total2: number = 0;
  public isSubmitted = false;
  public paidInstallments: number = 0;

  public oldInstallment: any = [];
  public currentInstallment: any = [];
  public arrayDelete: any = [];

  public studentInstallmentData: any = {};
  @Input() studentInstallments: any[];
  @Input() student: any;
  @Input() updateStudent: any;


  constructor(private studentAccountService: StudentAccountService) {
    this.calculatePaidInstallments();
    console.log(this.model_id);
   }

  prepareInstallments() {
    this.oldInstallment = [];
    this.currentInstallment = [];
    this.studentInstallments.forEach(element => {
      if (element.type == 'old')
        this.oldInstallment.push(element);
      else
        this.currentInstallment.push(element);
    });
  }

  /**
   * add row in the data and in installments arr
   */
  addRow1() {
    const item = this.createEmptyInstallmentObject();//this.studentInstallments[this.studentInstallments.length - 1];

    this.oldInstallment.push(item);
  }

  /**
   * add row in the data and in installments arr
   */
  addRow2() {
    const item = this.createEmptyInstallmentObject();//this.studentInstallments[this.studentInstallments.length - 1];

    this.currentInstallment.push(item);
  }

  /**
   * remove row from table and add deleted attribute
   * item.delted = 1
   * @param item
   */
  removeRow1(item: any, index: any) {
    if (!item.id) {
      // remove item from arr
      this.oldInstallment.splice(index, index + 1);
    } else
      this.oldInstallment.splice(index);
      item.deleted = 1;
      this.calculateTotal();
      this.arrayDelete.push(item.id)
      this.studentInstallmentData.deleteIds = this.arrayDelete ;
  }

  /**
   * remove row from table and add deleted attribute
   * item.delted = 1
   * @param item
   */
  removeRow2(item: any, index: any) {
    if (!item.id) {
      // remove item from arr
      this.currentInstallment.splice(index, index + 1);
    } else
    this.currentInstallment.splice(index);
      item.deleted = 1;
      this.calculateTotal2();
      this.arrayDelete.push(item.id)
      this.studentInstallmentData.deleteIds = this.arrayDelete ;
  }

  /**
   * get installment type
   * @return type string
   */
  getInstallmentType() {
    return this.student.old_balance > 0? "old" : "new";
  }

  /**
   * build request data of studentAccountService
   */
  buildInstallmentRequestData() {
    this.studentInstallmentData.student_id = this.student.id;
    this.studentInstallmentData.type = this.getInstallmentType();
    this.studentInstallmentData.api_token = Auth.getApiToken();
    if (this.getInstallmentType() == "old")
      this.studentInstallmentData.data = this.oldInstallment;
    else
      this.studentInstallmentData.data = this.currentInstallment;
  }

  /**
   * update installmenst of student
   */
  update() {
    this.isSubmitted = true;
    // update data of the api
    this.buildInstallmentRequestData();
    this.studentAccountService.updateStudentInstallments(this.studentInstallmentData).subscribe((r) => {
      // console.log(this.commission_id);
      //item.paid == 0
      // if(item.paid == 0)
      // {

      // }
      //  this.model_id = this.model_id;

      const data: any = r;
      if (data.status == 1) {
        Message.success(data.message);
        this.updateStudent();
      } else {
        Message.error(data.message);
      }
      this.isSubmitted = false;
    });

  }

  /**
   * validate on installments arr
   */
  validate() {
    let valid = true;
    this.studentInstallments.forEach(element => {
      if (!element.date || element.price <= 0)
        valid = false;
    });

    return valid;
  }

  /**
   * perform update
   * validate and update
   */
  performUpdate() {
    // this.model_id = 0;
    // console.log( this.currentInstallment);
    
    // console.log(this.studentInstallments);
    if (!this.validate())
      return Message.error(Helper.trans('please enter all data'));
    this.update();
  }

  /**
   * create empty object of installment to add new row
   */
  createEmptyInstallmentObject() {
    return {
      date: '',
      value: 0,
      paid: 0,
      model_id:this.student.current_model_id
    };
  }

  /**
   * calculate total of installments
   */
  calculateTotal() {

  }

  /**
   * calculate total of installments
   */
  calculateTotal1() {
    this.total1 = 0;
    this.oldInstallment.forEach(element => {
      this.total1 += parseFloat(element.value);
    });
  }

  /**
   * calculate total of installments
   */
  calculateTotal2() {
    this.total2 = 0;
    this.currentInstallment.forEach(element => {
      this.total2 += parseFloat(element.value);
    });
  }

  calculatePaidInstallments() {
    this.paidInstallments = 0;
    this.currentInstallment.forEach(element => {
      if(element.paid == 1){
        this.paidInstallments += parseFloat(element.value);
      }
    });
  }

  ngOnInit() {
    this.updateStudent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal1();
    this.calculateTotal2();
    this.prepareInstallments();
    this.calculatePaidInstallments();
  }

}
