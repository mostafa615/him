import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffairsRoutingModule } from './affairs-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AffairsComponent } from './affairs.component';
import { StudentModule } from '../student/student.module';
import { AccountModule } from '../account/account.module';
import { AdminisionModule } from '../adminision/adminision.module';
import { StudentAffairReport1Component } from './report/student-affair-report1/student-affair-report1.component';
import { StudentAffairReport2Component } from './report/student-affair-report2/student-affair-report2.component';
import { StudentAffairReport3Component } from './report/student-affair-report3/student-affair-report3.component';
import { StudentAffairReport4Component } from './report/student-affair-report4/student-affair-report4.component';
import { StudentAffairReport5Component } from './report/student-affair-report5/student-affair-report5.component';
import { StudentAffairReport6Component } from './report/student-affair-report6/student-affair-report6.component';
import { StudentAffairReport10Component } from './report/student-affair-report10/student-affair-report10.component';
import { StudentAffairReport11Component } from './report/student-affair-report11/student-affair-report11.component';
import { StudentAffairReport14Component } from './report/student-affair-report14/student-affair-report14.component';
import { StudentAffairReport15Component } from './report/student-affair-report15/student-affair-report15.component';import { Report21Component } from './report/report21/report21.component';
import { StudentAffairStudentStatusComponent } from './report/student-affair-student-status/student-affair-student-status.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './report/registration/registration.component';
import { PatientsComponent } from './report/patients/patients.component';
import { PatientreportComponent } from './report/patientreport/patientreport.component';
import { CreditHoursComponent } from './report/credit-hours/credit-hours.component';
import { ServiceComponent } from './report/service/service.component';

@NgModule({
  declarations: [
    AffairsComponent,
    StudentAffairReport1Component,
    StudentAffairReport2Component,
    StudentAffairReport3Component,
    StudentAffairReport4Component,
    StudentAffairReport5Component,
    StudentAffairReport6Component,
    StudentAffairReport10Component,
    StudentAffairReport11Component,
    StudentAffairReport14Component,
    StudentAffairReport15Component,
    Report21Component,
    StudentAffairStudentStatusComponent,
    RegistrationComponent,
    PatientsComponent,
    PatientreportComponent,
    CreditHoursComponent,
    ServiceComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AffairsRoutingModule,
    StudentModule,
    AccountModule,
    AdminisionModule,
    FormsModule,

  ]
})
export class AffairsModule { }
