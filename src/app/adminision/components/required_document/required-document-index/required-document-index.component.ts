import { Component, OnInit } from '@angular/core';
import { HashTable } from '../../../../../../node_modules/angular-hashtable';
import { RequiredDocumentService } from '../../../services/required-document.service';
import { AppModule } from '../../../../app.module';
import { Router } from '../../../../../../node_modules/@angular/router';
import { Helper } from '../../../../shared/helper';
import { SettingService } from 'src/app/settings/services/setting.service';
import { SettingTemplate } from 'src/app/settings/setting-template';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';

@Component({
  selector: 'app-required-document-index',
  templateUrl: './required-document-index.component.html',
  styleUrls: ['./required-document-index.component.scss']
})
export class RequiredDocumentIndexComponent extends SettingTemplate implements OnInit {


  constructor(public settingService: SettingService) {
    super(settingService);
    !Auth.can('required_document_read')? exit() : '';
    this.baseUrl = "required_documents";
    this.requiredFields = ['name', 'type'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
