import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module';
import { RequiredDocumentService } from '../../../services/required-document.service';
import { Auth } from '../../../../shared/auth';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { exit } from 'process';

@Component({
  selector: 'app-required-document-create',
  templateUrl: './required-document-create.component.html',
  styleUrls: ['./required-document-create.component.scss']
})
export class RequiredDocumentCreateComponent implements OnInit {

  public doc = AppModule.doc;
  public resource: any = {};
  public isSubmitted = false;

  constructor(private requiredDocumentService: RequiredDocumentService) {
    if (this.resource.id) {
      !Auth.can('required_document_edit')? exit() : '';
    } else {
      !Auth.can('required_document_add')? exit() : '';
    }
  }

  @Input() updateResources: any;
  ngOnInit() {
  }

  validate() {
    if (!this.resource.name || !this.resource.type)
      return false;

    return true;
  }

  addResource() {
    if (!this.validate())
      return Message.error(Helper.trans('fill all required data'));

    this.isSubmitted = true;
    this.resource.api_token = Auth.getApiToken();
    this.requiredDocumentService.store(this.resource).subscribe((res) => {
      const data: any = res;
      if (data.status == 1) {
        Message.success(data.message);
        this.resource = {};
        this.updateResources();
      }
      else
        Message.error(data.message);

      this.isSubmitted = false;
    });
  }
}
