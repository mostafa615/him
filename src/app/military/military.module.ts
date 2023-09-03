import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

import { MilitaryRoutingModule } from './military-routing.module';
import { MilitaryComponent } from './military.component';
import { MilitaryAreaComponent } from './components/military-area/military-area.component';
import { MilitaryStatusComponent } from './components/military-status/military-status.component';
import { StudentAgeComponent } from './components/student-age/student-age.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [MilitaryComponent, MilitaryAreaComponent, MilitaryStatusComponent,StudentAgeComponent],
  imports: [
    CommonModule,
    MilitaryRoutingModule,
    SharedModule,
    DataTablesModule,NgxPaginationModule
  ]
})
export class MilitaryModule { }
