import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminisionSettingComponent } from "../adminision/components/adminision-setting/adminision-setting.component";
import { ApplicationRequiredComponent } from "../adminision/components/application-required/application-required.component";
import { ApplicationCreateComponent } from "../adminision/components/application/application-create/application-create.component";
import { ApplicationIndexComponent } from "../adminision/components/application/application-index/application-index.component";
import { RequiredDocumentIndexComponent } from "../adminision/components/required_document/required-document-index/required-document-index.component";
import { StudentCreateComponent } from "../student/components/student/student-create/student-create.component";
import { StudentIndexComponent } from "../student/components/student/student-index/student-index.component";
import { StudentComponent } from "../student/student.component";
import { AffairsComponent } from "./affairs.component";
import { StudentAffairReport2Component } from "./report/student-affair-report2/student-affair-report2.component";
import { StudentAffairReport1Component } from "./report/student-affair-report1/student-affair-report1.component";
import { StudentAffairReport3Component } from "./report/student-affair-report3/student-affair-report3.component";
import { StudentAffairReport4Component } from "./report/student-affair-report4/student-affair-report4.component";
import { StudentAffairReport5Component } from "./report/student-affair-report5/student-affair-report5.component";
import { StudentAffairReport6Component } from "./report/student-affair-report6/student-affair-report6.component";
import { StudentAffairReport10Component } from "./report/student-affair-report10/student-affair-report10.component";
import { StudentAffairReport11Component } from "./report/student-affair-report11/student-affair-report11.component";
import { Report21Component } from "./report/report21/report21.component";
import { StudentAffairReport14Component } from "./report/student-affair-report14/student-affair-report14.component";
import { StudentAffairReport15Component } from "./report/student-affair-report15/student-affair-report15.component";
import { StudentAffairStudentStatusComponent } from "./report/student-affair-student-status/student-affair-student-status.component";
import { RegistrationComponent } from "./report/registration/registration.component";
import { PatientsComponent } from "./report/patients/patients.component";
import { RegistrationtypeComponent } from "../adminision/components/registrationtype/registrationtype.component";
import { RegistrationreportComponent } from "../adminision/components/registrationreport/registrationreport.component";
import { PatientreportComponent } from "./report/patientreport/patientreport.component";
import { CreditHoursComponent } from "./report/credit-hours/credit-hours.component";
import { ServiceComponent } from "./report/service/service.component";

const routes: Routes = [
  {
    path: "",
    component: AffairsComponent,
    children: [
      {
        path: "students",
        component: StudentIndexComponent,
      },
      {
        path: "students/create",
        component: StudentCreateComponent,
      },
      {
        path: "applications",
        component: ApplicationIndexComponent,
      },
      {
        path: "applications/create",
        component: ApplicationCreateComponent,
      },
      {
        path: "settings",
        component: AdminisionSettingComponent,
      },
      {
        path: "required_documents",
        component: RequiredDocumentIndexComponent,
      },
      {
        path: "application_required",
        component: ApplicationRequiredComponent,
      },
      {
        path: "report/report1",
        component: StudentAffairReport1Component,
      },
      {
        path: "registrationtype",
        component: RegistrationtypeComponent,
      },
      {
        path: "registrationreport",
        component: RegistrationreportComponent,
      },
      {
        path: "report/report2",
        component: StudentAffairReport2Component,
      },
      {
        path: "report/report3",
        component: StudentAffairReport3Component,
      },
      {
        path: "report/report4",
        component: StudentAffairReport4Component,
      },
      {
        path: "report/report5",
        component: StudentAffairReport5Component,
      },
      {
        path: "report/report6",
        component: StudentAffairReport6Component,
      },
      {
        path: "report/report10",
        component: StudentAffairReport10Component,
      },
      {
        path: "report/report11",
        component: StudentAffairReport11Component,
      },
      {
        path: "report/report21",
        component: Report21Component,
      },
      {
        path: "report/report15",
        component: StudentAffairReport15Component,
      },

      {
        path: "report/report14",
        component: StudentAffairReport14Component,
      },
      {
        path: "report/student-status",
        component: StudentAffairStudentStatusComponent,
      },
      {
        path: "report/registration",
        component: RegistrationComponent,
      },
      {
        path: "report/patients",
        component: PatientsComponent,
      },
      {
        path: "report/patientreport",
        component: PatientreportComponent,
      },
      {
        path: "report/creditHour",
        component: CreditHoursComponent,
      },
      {
        path: "report/service",
        component: ServiceComponent,
      },
      
    ],
  },

  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffairsRoutingModule {}
