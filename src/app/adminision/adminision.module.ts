import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { RequiredDocumentIndexComponent } from './components/required_document/required-document-index/required-document-index.component';
import { RequiredDocumentCreateComponent } from './components/required_document/required-document-create/required-document-create.component';
import { RequiredDocumentUpdateComponent } from './components/required_document/required-document-update/required-document-update.component';
import { AdminisionRoutingModule } from './adminision-routing.module';
import { AdminisionComponent } from './adminision.component';
import { ApplicationCreateComponent } from './components/application/application-create/application-create.component';
import { ApplicationIndexComponent } from './components/application/application-index/application-index.component';
import { ApplicationShowComponent } from './components/application/application-show/application-show.component';
import { ApplicationRequiredComponent } from './components/application-required/application-required.component';
import { ApplicationRequiredService } from './services/application-required.service';
import { ApplicationService } from './services/application.service';
import { RequiredDocumentService } from './services/required-document.service';
import { ApplicationSettingService } from './services/application-setting.service';
import { MatButtonModule } from '../../../node_modules/@angular/material';
import { AdminisionSettingComponent } from './components/adminision-setting/adminision-setting.component';
import { RegistrationtypeComponent } from './components/registrationtype/registrationtype.component';
import { RegistrationreportComponent } from './components/registrationreport/registrationreport.component';
@NgModule({
  declarations: [
    AdminisionComponent,
    RequiredDocumentIndexComponent,
    RequiredDocumentCreateComponent,
    RequiredDocumentUpdateComponent, ApplicationCreateComponent, ApplicationIndexComponent ,
    ApplicationShowComponent, ApplicationRequiredComponent, AdminisionSettingComponent, RegistrationtypeComponent, RegistrationreportComponent
],
  imports: [
    SharedModule,
    AdminisionRoutingModule,
    DataTablesModule,
    MatButtonModule
  ]
})
export class AdminisionModule {
  constructor(
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.loadSettings();
    }

}
