import { Component, OnInit, SimpleChanges, OnChanges, Input, ElementRef } from '@angular/core';
import { StoreService } from 'src/app/account/services/store.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { StudentServiceService } from 'src/app/account/services/student-service.service';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { AppModule } from '../../../../app.module';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Payment } from '../../../models/payment';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit , OnChanges{

  public total = 0;
  public doc: any = AppModule.doc;
  public user: any = Auth.user();
  public isSubmitted = false;
  public stores: any = [];
  public services: any = [];
  public auth: any = Auth;

  @Input() payments: any[];
  @Input() paymentsRow: any[];
  @Input() updateStudent: any;

  constructor(private service: StudentAccountService, private storeService: StoreService, private studentService: StudentServiceService, private globalService: GlobalService) { }

  calculateTotal() {
    this.total = 0;
    this.payments.forEach(element => {
      this.total += element.value;
    });
  }

  loadStores() {
    this.storeService.get().subscribe((res: any) => {
      this.stores = res;
    });
  }

  loadServices() {
    this.studentService.get().subscribe((res: any) => {
      this.services = res;
    });
  }

  removePayment(payment) {
    this.doc.swal.confirm(Helper.trans('are you sure'), ()=>{
      let data = {
        payment_id: payment.id
      };
      this.isSubmitted = true;
      this.service.payRemove(data).subscribe((r: any) => {
        if (r.status == 1) {
          Message.success(r.message);
          this.updateStudent();
        } else
          Message.error(r.message);

        this.isSubmitted = false;
      });
    });
  }

  editPayment(payment, editButton: any) {
    this.doc.swal.confirm(Helper.trans('are you sure'), ()=>{
      console.log(editButton);

      let content = editButton.innerHTML;
      editButton.disabled = true;
      editButton.innerHTML = "<i class='fa fa-spin fa-spinner' ></i>";

      this.service.editPayment(payment).subscribe((r: any) => {
        if (r.status == 1) {
          Message.success(r.message);
          this.updateStudent();
        } else
          Message.error(r.message);

          editButton.disabled = false;
          editButton.innerHTML = content;
      });
    });
  }



  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadStores();
    this.loadServices();
    this.calculateTotal();
  }

  changePaymentStatus(payment: any) {

    payment.is_print = payment.is_print == 0? '1' : '0';

    var data = {
      payment_id: payment.id,
      col: 'is_print',
      value: payment.is_print
    };

    this.globalService.store("account/change_payment_status", data).subscribe(function(res: any){
      if (res.status == 1)
        Message.success(res.message);
      else
        Message.error(res.message);
    });
  }

  printPayment(payment: any) {
    payment.is_print = 1;
    Payment.viewReceipt(payment.id);
  }
}
