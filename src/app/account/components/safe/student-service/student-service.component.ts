import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Message } from 'src/app/shared/message';
import { AppModule } from '../../../../app.module';
import { GlobalService } from '../../../../shared/services/global.service';
import { Helper } from '../../../../shared/helper';
import { environment } from 'src/environments/environment';
import { Auth } from '../../../../shared/auth';

@Component({
  selector: 'app-student-service',
  templateUrl: './student-service.component.html',
  styleUrls: ['./student-service.component.scss']
})
export class StudentServiceComponent implements OnInit {

  public total = 0;
  public doc: any = AppModule.doc;

  @Input() safeObject: any;
  auth: any = Auth;

  constructor(private globalService: GlobalService) { }

  calculateTotal() {
    this.total = 0;
    if (this.safeObject) {
      if (this.safeObject.payments) {
        this.safeObject.payments.forEach(element => {
          if (element.model_type == 'service')
            this.total += element.value;
        });
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
  }

  changePaymentStatus(payment: any) {
    payment.is_collect = payment.is_collect == '0'? '1' : '0';

    var data = {
      payment_id: payment.id,
      col: 'is_collect',
      value: payment.is_collect
    };

    this.globalService.store("account/change_payment_status", data).subscribe(function(res: any){
      if (res.status == 1)
        Message.success(res.message);
      else
        Message.error(res.message);
    });
  }

  printService(payment: any) {
    console.log('payment.model_object : ', payment.model_object);
    var data = {
      api_token: Auth.getApiToken(),
      student_id: payment.student_id,
      service_template_id: payment.model_object? payment.model_object.template_id : 0
    };
    var url = environment.publicUrl + "/api/account/services/print?" + $.param(data);
    Helper.openWindow(url);
  }

}
