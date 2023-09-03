import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRoutingModule } from './card-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './card.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { MatSliderModule, MatSlideToggleModule } from '@angular/material';
import { StudentAccountService } from '../account/services/student-account.service';
import { CardExportReportComponent } from './components/report/card-export-report/card-export-report.component';
import { SettingsComponent } from './components/report/settings/settings.component';

@NgModule({
  declarations: [CardComponent, CardExportReportComponent, SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  providers: [
   // StudentAccountService,
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class CardModule { }
