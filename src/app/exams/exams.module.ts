import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsRoutingModule } from './exams-routing.module';
import { ManageRoomsMapComponent } from './components/manage-rooms-map/manage-rooms-map.component';
import { ManageSeatingRoomsReportComponent } from './components/manage-seating-rooms-report/manage-seating-rooms-report.component';
import { PrintSeatingNumbersComponent } from './components/print-seating-numbers/print-seating-numbers.component';
import { PrintStudentsReportComponent } from './components/print-students-report/print-students-report.component';
import { RegisterExamsScheduleComponent } from './components/register-exams-schedule/register-exams-schedule.component';
import { ExamsComponent } from './exams.component';
import { SharedModule } from '../shared/shared.module';
import { TheatersComponent } from './components/theaters/theaters.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { PrintWallsReportsComponent } from './components/print-walls-reports/print-walls-reports.component';
import { PrintSignsReportsComponent } from './components/print-signs-reports/print-signs-reports.component';
import { AddSeatingNumbers } from './components/add-seating-numbers/add-seating-numbers.component';
import { SetNumbersNullComponent } from './components/set-numbers-null/set-numbers-null.component';
import { StudentsRoomsManageReportComponent } from './components/students-rooms-manage-report/students-rooms-manage-report.component';
import { SetNumbersComponent } from './components/set-numbers/set-numbers.component';

@NgModule({
  declarations: [ManageRoomsMapComponent, ManageSeatingRoomsReportComponent, PrintSeatingNumbersComponent, PrintStudentsReportComponent, RegisterExamsScheduleComponent, ExamsComponent, TheatersComponent, CommissionsComponent, PrintWallsReportsComponent, PrintSignsReportsComponent, AddSeatingNumbers, SetNumbersNullComponent, StudentsRoomsManageReportComponent, SetNumbersComponent],
  imports: [
    CommonModule,
    ExamsRoutingModule, SharedModule
  ]
})
export class ExamsModule { }
