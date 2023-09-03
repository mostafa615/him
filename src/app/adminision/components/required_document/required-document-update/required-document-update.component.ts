import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module';
import { RequiredDocumentService } from '../../../services/required-document.service';
import { Auth } from '../../../../shared/auth'; 
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-required-document-update',
  templateUrl: './required-document-update.component.html',
  styleUrls: ['./required-document-update.component.scss']
})
export class RequiredDocumentUpdateComponent implements OnInit {

  public doc = AppModule.doc;
  public isSubmitted = false;

  @Input() updateResources: any;
  @Input() resource: any = {};

  constructor(private requiredDocumentService: RequiredDocumentService) { }

  ngOnInit() {
  }

  validate() {
    if (!this.resource.name || !this.resource.type)
      return false;
    
    return true;
  }

  updateResource() {
    if (!this.validate())
      return Message.error(Helper.trans('fill all required data'));

    this.isSubmitted = true;
    this.resource.api_token = Auth.getApiToken();
    this.requiredDocumentService.update(this.resource).subscribe((res) => {
      const data: any = res;
      if (data.status == 1) {
        Message.success(data.message); 
        //this.updateResources();
      }
      else
        Message.error(data.message);

      this.isSubmitted = false;
    });
  }

}
