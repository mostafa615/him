import { AvailableCoursesReportComponent } from './components/available-courses-report/available-courses-report.component';
import { ResultStatsComponent } from "./components/result-stats/result-stats.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Auth } from "../shared/auth";
import { AuthGuestService } from "../shared/middlewares/auth-guest.service";
import { AcademicPlanComponent } from "./components/academic-plan/academic-plan.component";

import { AcademicSettingComponent } from "./components/academic-setting/academic-setting.component";
import { ControlReportComponent } from "./components/control-report/control-report.component";
import { DoctorIndexComponent } from "./components/doctor/doctor-index/doctor-index.component";
import { OpenCourseComponent } from "./components/open-course/open-course.component";
import { PublisherResultComponent } from "./components/publisher-result/publisher-result.component";
import { ResultTransferComponent } from "./components/result-transfer/result-transfer.component";
import { StudentRegisterCourseComponent } from "./components/student-register-course/student-register-course.component";
import { StudentResultIndexComponent } from "./components/student-result-index/student-result-index.component";
import { OneStudenResultComponent } from "./components/one-studen-result/one-studen-result.component";
import { SectionCourseComponent } from "./components/section-course/section-course.component";
import { GroupCourseComponent } from "./components/group-course/group-course.component";
import { SectionsScheduleComponent } from "./components/sections-schedule/sections-schedule.component";
import { StudentsManageReportComponent } from "./components/students-manage-report/students-manage-report.component";
import { AcademicReportComponent } from "./components/academic-report/academic-report.component";
import { AcademicReportDailyComponent } from "./components/academic-report-daily/academic-report-daily.component";
import { ExamsScheduleComponent } from "./components/exams-schedule/exams-schedule.component";
import { PublisherResultReportComponent } from "./components/publisher-result-report/publisher-result-report.component";
import { ControlAndResultsComponent } from "./components/control-and-results/control-and-results.component";
import { AttendanceReportComponent } from "./components/attendance-report/attendance-report.component";
import { CoursesStatsComponent } from "./components/courses-stats/courses-stats.component";
import { MinistryCumulativeReportComponent } from "./components/ministry-cumulative-report/ministry-cumulative-report.component";
import { StudentResultsComponent } from "./components/student-results/student-results.component";
import { PrerequsiteComponent } from "./components/prerequsite/prerequsite.component";
import { MedtermComponent } from "./components/medterm/medterm.component";
import { FaildStudentComponent } from "./components/faild-student/faild-student.component";
import { TermsefyComponent } from "./components/termsefy/termsefy.component";
import { StudentsefyComponent } from "./components/studentsefy/studentsefy.component";

import { TaqderComponent } from "./components/taqder/taqder.component";
import { ToptenComponent } from "./components/topten/topten.component";
import { YearworkComponent } from "./components/yearwork/yearwork.component";
import { AcademicNewComponent } from "./components/academic-new/academic-new.component";
import { AcademicComponent } from "./academic.component";
import { AvailableServiceComponent } from '../account/components/safe/available-service/available-service.component';
import { DetailsAcademicRegisterComponent } from './components/details-academic-register/details-academic-register.component';
import { GraduationReportComponent } from './components/graduation-report/graduation-report.component';
import { StudentGraduationResultComponent } from './components/student-graduation-result/student-graduation-result.component';
import { Allgrdlevel2Component } from './components/allgrdlevel2/allgrdlevel2.component';
import { GraduationGovComponent } from './components/graduation-gov/graduation-gov.component';

const routes: Routes = [
  // {
    // path: "",
    // component: AcademicComponent,
    // children: [
      {
        path: "plan",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: AcademicPlanComponent,
      },
      {
        path: "termsefy",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: TermsefyComponent,
      },
      {
        path: "setting",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("academic_setting") },
        component: AcademicSettingComponent,
      },
      {
        path: "studentsefy",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("academic_setting") },
        component: StudentsefyComponent,
      },
      {
        path: "open-course",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("open_course") },
        component: OpenCourseComponent,
      },
      {
        path: "available-courses-report",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("open_course") },
        component: AvailableCoursesReportComponent,
      },
      {
        path: "student-register-course",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("student_register") },
        component: StudentRegisterCourseComponent,
      },
      {
        path: "doctors",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("doctor_read") },
        component: DoctorIndexComponent,
      },
      {
        path: "student-result",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control") },
        component: StudentResultIndexComponent,
      },
      {
        path: "student-graduation-result",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control") },
        component: StudentGraduationResultComponent,
      },
      {
        path: "allgradlevel2",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control") },
        component: Allgrdlevel2Component,
      },
      {
        path: "student-results",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control") },
        component: OneStudenResultComponent,
      },
      {
        path: "students-results",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control") },
        component: StudentResultsComponent,
      },
      {
        path: "graduatuin-gov",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control") },
        component: GraduationGovComponent,
      },
      {
        path: "control-report",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: ControlReportComponent,
      },
      {
        path: "control-and-results",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: ControlAndResultsComponent,
      },
      {
        path: "grade",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: TaqderComponent,
      },
      {
        path: "attendance-report",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: AttendanceReportComponent,
      },
      {
        path: "publisher-result",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: PublisherResultComponent,
      },
      {
        path: "ministry-cumulative-report",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: MinistryCumulativeReportComponent,
      }, {
        path: "graduation-report",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: GraduationReportComponent
      },
      {
        path: "publisher-result-report",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: PublisherResultReportComponent,
      },
      {
        path: "result-stats",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: ResultStatsComponent,
      },
      {
        path: "prerequsite",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: PrerequsiteComponent,
      },
      {
        path: "medterm",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: MedtermComponent,
      },
      {
        path: "details",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: DetailsAcademicRegisterComponent,
      },
      {
        path: "faild_student",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: FaildStudentComponent,
      },
      {
        path: "topten",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: ToptenComponent,
      },
      {
        path: "yearwork",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: YearworkComponent,
      },
      {
        path: "courses-stats",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("control_report") },
        component: CoursesStatsComponent,
      },
      {
        path: "result-transfer",
        canActivate: [AuthGuestService],
        data: { can: Auth.can("result_transfer") },
        component: ResultTransferComponent,
      },
      {
        path: "group-course",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: GroupCourseComponent,
      },
      {
        path: "section-course",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: SectionCourseComponent,
      },
      {
        path: "sections-schedule",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: SectionsScheduleComponent,
      },
      {
        path: "students-manage-report",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: StudentsManageReportComponent,
      },
      {
        path: "academic-report",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: AcademicReportComponent,
      },
      {
        path: "academic-report-daily",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: AcademicReportDailyComponent,
      },
      {
        path: "academic-new",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: AcademicNewComponent,
      },

      {
        path: "exams-schedule",
        canActivate: [AuthGuestService],
        data: {
          can: Auth.canOr([
            "course_read",
            "course_category_read",
            "degree_map_read",
          ]),
        },
        component: ExamsScheduleComponent,
      },
      {
        path: "**",
        redirectTo: "/",
        pathMatch: "full",
      },
    // ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
//
export class AcademicRouteModule {}
