import { StudentAccountService } from './../../../services/student-account.service';
import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../models/payment';
import { Message } from '../../../../shared/message';
import { Auth } from '../../../../shared/auth';
import { Helper } from '../../../../shared/helper';
import { AppModule } from '../../../../app.module';
import { SafeMsgBuilder } from '../../../helpers/safe-msg-builder';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { HashTable } from 'angular-hashtable';
import { SafeAlerter } from '../../../helpers/safe-alerter';
import { StudentService } from 'src/app/student/services/student.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-safe-index',
  templateUrl: './safe-index.component.html',
  styleUrls: ['./safe-index.component.scss']
})
export class SafeIndexComponent implements OnInit {


  // init document
  public doc: any = document;
paymony=0;
  public safeObject: any = {};
  public payment: Payment;
  public searchKey: string;
  totalPayments : number = 0;
  public studentSearchId;
  public availableServices: any;

  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public showStudentInstallment = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];
  public isStudentSayed = false;
  public updateStudent: any;

  public selectedServices = new HashTable<any, any>();
  public safeAlerter: SafeAlerter;
  disco=0
  idd
  constructor(public studentService: StudentService,private globalService: GlobalService ,private studentAcountService: StudentAccountService, private route: ActivatedRoute) {
    this.init();
    this.initSafeObject();
    const id = this.route.snapshot.params['id'];
    this.idd=this.route.snapshot.params['id'];
    if (id > 0) {
      this.loadStudentAccountInfo(id);
      this.ShowStudentrecords( this.idd);
      this.showPaied()
    }
  }

  init() {
    this.updateStudent = () => {
      this.updateStudentAction();
      this.selectedServices = new HashTable<any, any>();
    };
  }
  openmodel3(){
    this.ShowStudentrecords(this.StudIDD)
this.showPaied();
    this.ShowPaymentSummer()
    this.display3="block"
  }
  closemodel3(){
    this.ShowStudentrecords(this.StudIDD)
    this.showPaied()
    this.display3="none"

  }
  studentDataSummer
  datemodify
  seriel
  book_serial
  display3='none'
  ShowStudentrecords(idd){
    this.studentDataSummer=null
    let formdata={
      "student_id":idd
    }
    this.globalService.get('academic/summer/payments/get',formdata).subscribe( (res: any) => {

      this.studentDataSummer=res["data"]
      this.datemodify=res["data"]["date"]
      this.seriel=res["serial"]
      this.book_serial=res["book_serial"]
    });
  }
  NotPaied=0;
  showPaied(){
    this.NotPaied=null
    let formdata={
      "student_id":this.StudIDD
    }
    this.globalService.get('account/installment/get/not-paid',formdata).subscribe( (res: any) => {

      this.NotPaied=res

    });
  }
  summerPayment=[]
  ShowPaymentSummer(){
    this.summerPayment=[]
    let formdata={
      "student_id":this.StudIDD
    }
    this.globalService.get('academic/summer/payments/receipt/student/get',formdata).subscribe( (res: any) => {

      this.summerPayment=res

    });
  }

  initSafeObject() {
    // set default image
    this.safeObject.image = '/assets/img/avatar.png';
    this.safeObject.notes = 'some notes here';
    this.safeObject.level = {};
    this.safeObject.case_constraint = {};
    this.safeObject.constraint_status = {};
    this.safeObject.paid_value = 0;
    this.safeObject.division = {};
    this.safeObject.payment_details = []
  }

  searchInputEvent() {
    if (!this.searchKey)
      return;

    this.students = [];
    this.studentSearchDialogLoader = true;
    this.isWait = true;
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
       this.searchAboutStudent();
    }, 500);
  }

  searchAboutStudent() {
    this.studentAcountService.search(this.searchKey).subscribe((r) => {
        this.studentSearchDialogLoader = false;
        this.students = r;
        if (this.students.length > 0) {
          this.studentSearchDialogShow = true;
        }
    });
  }
StudIDD
  selectStudent(student) {
    this.studentSearchDialogShow = false;
    this.searchKey = student.name;
    this.studentSearchId = student.id;
    this.StudIDD=student.id;
    //
    this.loadStudentAccountInfo(student.id);
    this.ShowStudentrecords(student.id);
  this.showPaied()

  }

  loadStudentAccountInfo(id) {
    if (!id)
      return Message.error('search about student first');
    this.studentAcountService.getStudentAccount(id).subscribe((r: any) => {
      // get student payments details
      console.log(r.payments);

      console.log(r.payments);

      r.payments.forEach(p => {
          this.safeObject.payment_details.push(p)
      });
       this.totalPayments = r.payments.reduce((total,item) => total + item.value, 0)



      if (this.safeObject.id != r.id)
        this.isStudentSayed = false;

      this.safeObject = r;
      this.buildSafeMsg();
      this.studentSearchId = this.safeObject.id;

      if (!this.safeObject.old_balance)
        this.safeObject.old_balance = 0;

      if (!this.safeObject.current_balance)
        this.safeObject.current_balance = 0;

      if (!this.safeObject.paid_value)
        this.safeObject.paid_value = 0;

      if (!this.safeObject.image)
        this.safeObject.image = '/assets/img/avatar.png';
      this.loadAvailableServices();

      this.alertForOldBalance();
      this.safeAlerter = new SafeAlerter(this.safeObject);
      this.safeAlerter.notify();
    });
  }

  updateStudentAction() {
    if (this.safeObject)
      if (this.safeObject.id){
        this.loadStudentAccountInfo(this.safeObject.id);
        this.ShowStudentrecords(this.safeObject.id);
        this.showPaied()

      }
  }

  /**
   * perform payment
   */
  performPay() {
    Message.confirm(Helper.trans('are_you_sure'), ()=>{
      this.payment = new Payment(this.safeObject, this.studentAcountService, ()=>{
        this.updateStudent();
      });
      return this.payment.pay();
    });
  }
  formdataupdate={}
onUpdate(id,date){
 this.formdataupdate={
"payment_id":id,
"date":date
  }
  this.globalService.store('academic/summer/payments/receipt/student/update-date',this.formdataupdate).subscribe( (res: any) => {


    if(res["status"]==1){
      Message.success(res["message"])
    }
    else{
      Message.error(res["message"])
    }

  });
}
  /**
   *  load available services for student
   */
  loadAvailableServices() {
    if(this.safeObject.id) {
      this.studentAcountService.getAvailabeServices(this.safeObject.id).subscribe((r) => {
        this.availableServices = r;
      });
    }
  }
  display='none'
  onCloseModal(){
    this.ShowStudentrecords(this.StudIDD)
    this.showPaied()
    this.display = 'none';

  }
  onCloseModal1(){
    this.ShowStudentrecords(this.StudIDD)
    this.showPaied()
    this.display1 = 'none';

  }

  buildSafeMsg() {
    return;
    if (this.isStudentSayed)
      return;

    let builder = new SafeMsgBuilder();
    builder
      .setGender(this.safeObject.gender)
      .setName(this.safeObject.name)
      //.setCode(this.safeObject.code)
      .setLevel(this.safeObject.level? this.safeObject.level.name : null)
      .setDivision(this.safeObject.division? this.safeObject.division.name : null)
      .setOldBalance(this.safeObject.old_balance)
      .setCurrentBalance(this.safeObject.current_balance)
      .setPaidValue(this.safeObject.paid_value)
      .say();
    this.isStudentSayed = true;
  }

  getSelectedServices() {

  }

  alertForOldBalance() {
    if (this.safeObject.old_balance > 0) {
      let message = 'تنيه يوجد رسوم سابقه على الطالب بقيمة ' + this.safeObject.old_balance;
      this.doc.Swal.fire({title: message});
    }
  }


  ngOnInit() {
  }
  valuedis=0
  mode
  openmodel(value , mode){
    this.ShowStudentrecords(this.StudIDD)
    this.showPaied();
    this.disco=0;
    this.mode=null
    this.disco=0;
    this.paymony=0;
    this.display = 'block';
    this.mode=mode;
  }
  formData={}
  formData2={}
  display1='none'
responehtml
onsubmitPay(){

if(this.mode==1){
  this.formData={
    "payment_id":this.studentDataSummer["id"],
    "type":this.mode,
     "discount":this.disco,
     "payment_price": this.paymony,
     "date":this.datemodify,
     "serial":this.seriel

}
}else if(this.mode==2){
  this.formData={
    "payment_id":this.studentDataSummer["id"],
    "type":this.mode,
     "discount":this.disco,
     "payment_price": this.paymony,
     "date":this.datemodify,
     "book_serial":this.book_serial

}
}else{
  this.formData={
    "payment_id":this.studentDataSummer["id"],
    "type":this.mode,
     "discount":this.disco,
     "payment_price": this.paymony,
     "date":this.datemodify,

}
}


  this.globalService.store('academic/summer/payments/pay',this.formData).subscribe( (res: any) => {
    console.log(res);
    this.responehtml=res
    console.log( this.responehtml)

    if(res["status"]==1){
      Message.success(res["message"])
      this.display='none'
      if(this.mode!=3){
        this.getRecit()

      }
      this.ShowStudentrecords(this.StudIDD)
      this.showPaied()
    }
    else{
      Message.error(res["message"])
    }

  });



  // this.display1='block'


}
getRecit(){
  if(this.mode==1){
    this.formData2={
      "serial":this.seriel,
      api_token: Auth.getApiToken(),
  }
  }else{
    this.formData2={
      "book_serial":this.book_serial,
      api_token: Auth.getApiToken(),
  }
  }

const options = "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=905,height=484";

       const url = environment.apiUrl + "/academic/summer/payments/receipt/get?" + AppModule.doc.jquery.param(this.formData2);
       window.open(url, "_blank", options);
}

getRecitPrint(idd){

    this.formData2={
      "payment_id":idd,
      api_token: Auth.getApiToken(),
    }


const options = "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=905,height=484";

       const url = environment.apiUrl + "/academic/summer/payments/receipt/student/print?" + AppModule.doc.jquery.param(this.formData2);
       window.open(url, "_blank", options);
}
}
