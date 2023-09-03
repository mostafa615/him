import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { AddSeatingNumbers } from './components/add-seating-numbers/add-seating-numbers.component';
import { ManageRoomsMapComponent } from './components/manage-rooms-map/manage-rooms-map.component';
import { ManageSeatingRoomsReportComponent } from './components/manage-seating-rooms-report/manage-seating-rooms-report.component';
import { PrintSeatingNumbersComponent } from './components/print-seating-numbers/print-seating-numbers.component';
import { PrintSignsReportsComponent } from './components/print-signs-reports/print-signs-reports.component';
import { PrintStudentsReportComponent } from './components/print-students-report/print-students-report.component';
import { PrintWallsReportsComponent } from './components/print-walls-reports/print-walls-reports.component';
import { RegisterExamsScheduleComponent } from './components/register-exams-schedule/register-exams-schedule.component';
import { TheatersComponent } from './components/theaters/theaters.component';
import { ExamsComponent } from './exams.component';
import { SetNumbersNullComponent } from './components/set-numbers-null/set-numbers-null.component';
import { StudentsRoomsManageReportComponent } from './components/students-rooms-manage-report/students-rooms-manage-report.component';
import { SetNumbersComponent } from './components/set-numbers/set-numbers.component';

const routes: Routes = [
  {
    path: '',
    component: ExamsComponent
  },
  {
    path: 'register-exams-schedule',
    component: RegisterExamsScheduleComponent
  },
  {
    path: 'print-seating-numbers',
    component: PrintSeatingNumbersComponent
  },
  {
    path: 'print-students-report',
    component: PrintStudentsReportComponent
  },
  {
    path: 'manage-rooms-map',
    component: ManageRoomsMapComponent
  },
  {
    path: 'manage-seating-rooms-report',
    component: ManageSeatingRoomsReportComponent
  },
  {
    path: 'theaters',
    component: TheatersComponent
  },
  {
    path: 'commissions',
    component: CommissionsComponent
  },
  {
    path: 'print-walls-reports',
    component: PrintWallsReportsComponent
  },
  {
    path: 'print-signs-reports',
    component: PrintSignsReportsComponent
  },
  {
    path: 'add-seating-numbers',
    component: AddSeatingNumbers
  },
  {
    path: 'set-numbers-null',
    component: SetNumbersNullComponent
  },
  {
    path: 'set-numbers',
    component: SetNumbersComponent
  },
  {
    path: 'students-rooms-manage-report',
    component: StudentsRoomsManageReportComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
