import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicComponent } from './academic.component';
import { AcademicPlanComponent } from './components/academic-plan/academic-plan.component';
import { CreateCourseFormComponent } from './components/create-course-form/create-course-form.component';
import { CreateCourseCategoryFormComponent } from './components/create-course-category-form/create-course-category-form.component';
import { CreateDegreeMapFormComponent } from './components/create-degree-map-form/create-degree-map-form.component';
import { AcademicRouteModule } from './academic-route.module';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatSliderModule, MatSlideToggleModule, MatSortModule, MatTableModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { AcademicSettingComponent } from './components/academic-setting/academic-setting.component';
import { OpenCourseComponent } from './components/open-course/open-course.component';
import { StudentRegisterCourseComponent } from './components/student-register-course/student-register-course.component';
import { DoctorIndexComponent } from './components/doctor/doctor-index/doctor-index.component';
import { DoctorFormComponent } from './components/doctor/doctor-form/doctor-form.component';
import { StudentResultIndexComponent } from './components/student-result-index/student-result-index.component';
import { ControlReportComponent } from './components/control-report/control-report.component';
import { ResultTransferComponent } from './components/result-transfer/result-transfer.component';
import { PublisherResultComponent } from './components/publisher-result/publisher-result.component';
import { ResultStatsComponent } from './components/result-stats/result-stats.component';
import { OneStudenResultComponent } from './components/one-studen-result/one-studen-result.component';
import { GroupCourseComponent } from './components/group-course/group-course.component';
import { SectionCourseComponent } from './components/section-course/section-course.component';
import { SectionsScheduleComponent } from './components/sections-schedule/sections-schedule.component';
import { StudentsManageReportComponent } from './components/students-manage-report/students-manage-report.component';
import { AcademicReportComponent } from './components/academic-report/academic-report.component';
import { ExamsScheduleComponent } from './components/exams-schedule/exams-schedule.component';
import { PublisherResultReportComponent } from './components/publisher-result-report/publisher-result-report.component';
import { ControlAndResultsComponent } from './components/control-and-results/control-and-results.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { CoursesStatsComponent } from './components/courses-stats/courses-stats.component';
import { MinistryCumulativeReportComponent } from './components/ministry-cumulative-report/ministry-cumulative-report.component';
import { StudentResultsComponent } from './components/student-results/student-results.component';
import { PrerequsiteComponent } from './components/prerequsite/prerequsite.component';
import { MedtermComponent } from './components/medterm/medterm.component';
import { LevelsPipe } from './levels.pipe';
import { TermPipe } from './term.pipe';
import { TermsectionPipe } from './termsection.pipe';
import { DivisionPipe } from './division.pipe';
import { GroupsPipe } from './groups.pipe';
import { CoursePipe } from './course.pipe';
import { TermsefyComponent } from './components/termsefy/termsefy.component';
import { StudentsefyComponent } from "./components/studentsefy/studentsefy.component";

import { YearPipe } from './year.pipe';
import { TaqderComponent } from './components/taqder/taqder.component';
import { ToptenComponent } from './components/topten/topten.component';
import { YearworkComponent } from './components/yearwork/yearwork.component';
import { AcademicNewComponent } from './components/academic-new/academic-new.component';
import { FaildStudentComponent } from './components/faild-student/faild-student.component';
import { AvailableCoursesReportComponent } from './components/available-courses-report/available-courses-report.component';
import { AcademicReportDailyComponent } from './components/academic-report-daily/academic-report-daily.component';
import { DetailsAcademicRegisterComponent } from './components/details-academic-register/details-academic-register.component';
import { GraduationReportComponent } from './components/graduation-report/graduation-report.component';

import { StudentGraduationResultComponent } from './components/student-graduation-result/student-graduation-result.component';
import { Allgrdlevel2Component } from './components/allgrdlevel2/allgrdlevel2.component';
import { GraduationGovComponent } from './components/graduation-gov/graduation-gov.component';

@NgModule({
  declarations: [
    MinistryCumulativeReportComponent,
    Allgrdlevel2Component,GraduationGovComponent,
    GraduationReportComponent,
    StudentGraduationResultComponent,
    AcademicComponent,
    StudentsefyComponent,
    AcademicPlanComponent,
    CreateCourseFormComponent,
    CreateCourseCategoryFormComponent,
    CreateDegreeMapFormComponent,
    AcademicSettingComponent,
    OpenCourseComponent,
    DoctorIndexComponent,
    DoctorFormComponent,
    StudentResultIndexComponent,
    ControlReportComponent,
    StudentRegisterCourseComponent,
    ResultTransferComponent,
    PublisherResultComponent,
    ResultStatsComponent,
    OneStudenResultComponent,
    GroupCourseComponent,
    SectionCourseComponent,
    SectionsScheduleComponent,
    StudentsManageReportComponent,
    AcademicReportComponent,
    ExamsScheduleComponent,
    PublisherResultReportComponent,
    ControlAndResultsComponent,
    AttendanceReportComponent,
    CoursesStatsComponent,
    StudentResultsComponent,
    PrerequsiteComponent,
    MedtermComponent,
    LevelsPipe,
    DivisionPipe,
    GroupsPipe,
    CoursePipe,
    TermPipe,
    TermsectionPipe,
    TermsefyComponent,
    YearPipe,
    TaqderComponent,
    ToptenComponent,
    YearworkComponent,
    AcademicNewComponent,
    FaildStudentComponent,
    AvailableCoursesReportComponent,
    AcademicReportDailyComponent,
    DetailsAcademicRegisterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AcademicRouteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class AcademicModule { }
