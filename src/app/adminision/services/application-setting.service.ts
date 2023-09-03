import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/request';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingService {

  public static NATIONALITIES: any = [];
  public static CASE_CONSTRAINTS: any = [];
  public static ACADEMIC_YEARS: any = [];
  public static QUALIFICATION_TYPES: any = [];
  public static QUALIFICATIONS: any = [];
  public static REGISTERATION_STATUS: any = [];
  public static REGISTERATION_METHODS: any = [];
  public static LANGUAGES: any = [];
  public static CITIES: any = [];
  public static GOVERNMENTS: any = [];
  public static TAQDERS: any = [];
  public static COUNTRIES: any = [];
  public static MILITARY_STATUS: any = [];
  public static MILITARY_AREAS: any = [];
  public static PARENT_JOBS: any = [];
  public static RELATIVE_RELATIONS: any = [];
  public static REQUIRED_DOCUMENTS: any = [];
  public static DEPARTMENTS: any = [];
  public static REGSITERATIN_STATUS_DOCUMENTS: any = [];
  public static DIVISIONS: any = [];
  public static SETTINGS: any = [];

  public static LOADED: any = false;

  public requestQueue = [];
  static TERMS: any;

  constructor(private http: HttpClient) {
    this.queueRequests();
  }

  queueRequests() {
    if (ApplicationSettingService.CASE_CONSTRAINTS.length <= 0)
      Request.addToQueue({ observer: this.getCaseConstraints(), action: (res) => { ApplicationSettingService.CASE_CONSTRAINTS = res; } });

    if (ApplicationSettingService.NATIONALITIES.length <= 0)
      Request.addToQueue({ observer: this.getNationalities(), action: (res) => { ApplicationSettingService.NATIONALITIES = res; } });

    if (ApplicationSettingService.ACADEMIC_YEARS.length <= 0)
      Request.addToQueue({ observer: this.getAcademicYears(), action: (res) => { ApplicationSettingService.ACADEMIC_YEARS = res; } });

    if (ApplicationSettingService.QUALIFICATION_TYPES.length <= 0)
      Request.addToQueue({ observer: this.getQualificationTypes(), action: (res) => { ApplicationSettingService.QUALIFICATION_TYPES = res; } });

    if (ApplicationSettingService.QUALIFICATIONS.length <= 0)
      Request.addToQueue({ observer: this.getQualifications(), action: (res) => { ApplicationSettingService.QUALIFICATIONS = res; } });

    if (ApplicationSettingService.REGISTERATION_STATUS.length <= 0)
      Request.addToQueue({ observer: this.getRegisterationStatus(), action: (res) => { ApplicationSettingService.REGISTERATION_STATUS = res; } });

    if (ApplicationSettingService.REGISTERATION_METHODS.length <= 0)
      Request.addToQueue({ observer: this.getRegisterationMethods(), action: (res) => { ApplicationSettingService.REGISTERATION_METHODS = res; } });

    if (ApplicationSettingService.LANGUAGES.length <= 0)
      Request.addToQueue({ observer: this.getLanguages(), action: (res) => { ApplicationSettingService.LANGUAGES = res; } });

    if (ApplicationSettingService.CITIES.length <= 0)
      Request.addToQueue({ observer: this.getCities(), action: (res) => { ApplicationSettingService.CITIES = res; } });

    if (ApplicationSettingService.GOVERNMENTS.length <= 0)
      Request.addToQueue({ observer: this.getGovernments(), action: (res) => { ApplicationSettingService.GOVERNMENTS = res; } });

    // if (ApplicationSettingService.TAQDERS.length <= 0)
    //   Request.addToQueue({ observer: this.getTaqder(), action: (res) => { ApplicationSettingService.TAQDERS = res; } });

    if (ApplicationSettingService.COUNTRIES.length <= 0)
      Request.addToQueue({ observer: this.getCountries(), action: (res) => { ApplicationSettingService.COUNTRIES = res; } });

    if (ApplicationSettingService.MILITARY_STATUS.length <= 0)
      Request.addToQueue({ observer: this.getMilitaryStatus(), action: (res) => { ApplicationSettingService.MILITARY_STATUS = res; } });

    if (ApplicationSettingService.MILITARY_AREAS.length <= 0)
      Request.addToQueue({ observer: this.getMilitaryAreas(), action: (res) => { ApplicationSettingService.MILITARY_AREAS = res; console.log("MILITARY AREAS : ", res); } });

    if (ApplicationSettingService.PARENT_JOBS.length <= 0)
      Request.addToQueue({ observer: this.getParentJobs(), action: (res) => { ApplicationSettingService.PARENT_JOBS = res; } });

    if (ApplicationSettingService.RELATIVE_RELATIONS.length <= 0)
      Request.addToQueue({ observer: this.getRelativeRelations(), action: (res) => { ApplicationSettingService.RELATIVE_RELATIONS = res; } });

    if (ApplicationSettingService.REQUIRED_DOCUMENTS.length <= 0)
      Request.addToQueue({ observer: this.getRequiredDocuments(), action: (res) => { ApplicationSettingService.REQUIRED_DOCUMENTS = res; } });

    if (ApplicationSettingService.DEPARTMENTS.length <= 0)
      Request.addToQueue({ observer: this.getDepartments(), action: (res) => { ApplicationSettingService.DEPARTMENTS = res; } });

    if (ApplicationSettingService.REGSITERATIN_STATUS_DOCUMENTS.length <= 0)
      Request.addToQueue({ observer: this.getRegisterationStatusDocuments(), action: (res) => { ApplicationSettingService.REGSITERATIN_STATUS_DOCUMENTS = res; } });

    if (ApplicationSettingService.DIVISIONS.length <= 0)
      Request.addToQueue({ observer: this.getDivisions(), action: (res) => { ApplicationSettingService.DIVISIONS = res; } });

    if (ApplicationSettingService.SETTINGS.length <= 0)
      Request.addToQueue({ observer: this.getSettings(), action: (res) => { ApplicationSettingService.SETTINGS = res; } });


  }

  public load() {
    let firstElement = this.requestQueue.pop();

    if (firstElement) {
      if (ApplicationSettingService[firstElement.object].length <= 0) {
        firstElement.request.subscribe(
          (res) => {
            ApplicationSettingService[firstElement.object] = res;
            console.log(firstElement.object);
            //
            //console.log(this.requestQueue.length);
            //console.log(ApplicationSettingService[firstElement.object]);
            this.loadSettings();
          },
          (error) => {
            this.loadSettings();
          },
          () => {
            this.loadSettings();
          }
        );
      }
    }
  }

  public loadSettings() {
    Request.fire();
  }

  public getDivisions() {
    return this.http.get('account/divisions?api_token=' + Auth.getApiToken());
  }
  public commision_types() {
    return this.http.get('commission_types?api_token=' + Auth.getApiToken());
  }

  public getRegisterationStatusDocuments() {

    const observable = this.http.get('adminision/get_registeration_status_document?api_token=' + Auth.getApiToken());
    return observable
  }

  public getDepartments() {
    return this.http.get('adminision/get_departments?api_token=' + Auth.getApiToken());
  }

  public getRequiredDocuments() {
    return this.http.get('adminision/required_documents?api_token=' + Auth.getApiToken());
  }

  public getCaseConstraints() {
    return this.http.get('adminision/get_case_constraints?api_token=' + Auth.getApiToken());
  }

  public getRelativeRelations() {
    return this.http.get('adminision/get_relative_relations?api_token=' + Auth.getApiToken());
  }

  public getNationalities() {
    return this.http.get('adminision/get_nationality?api_token=' + Auth.getApiToken());
  }

  public getAcademicYears() {
    return this.http.get('adminision/get_academic_years?api_token=' + Auth.getApiToken());
  }

  public getQualificationTypes() {
    return this.http.get('adminision/get_qualification_types?api_token=' + Auth.getApiToken());
  }

  public getQualifications() {
    return this.http.get('adminision/get_qualifications?api_token=' + Auth.getApiToken());
  }

  public getRegisterationStatus() {
    return this.http.get('adminision/get_registeration_status?api_token=' + Auth.getApiToken());
  }

  public getRegisterationMethods() {
    return this.http.get('adminision/get_registration_methods?api_token=' + Auth.getApiToken());
  }

  public getLanguages() {
    return this.http.get('adminision/get_languages?api_token=' + Auth.getApiToken());
  }

  public getCities() {
    return this.http.get('adminision/get_cities?api_token=' + Auth.getApiToken());
  }

  public getGovernments() {
    return this.http.get('adminision/get_governments?api_token=' + Auth.getApiToken());
  }
  // public getTaqder() {
  //   return this.http.get('adminision/get_aqder?api_token=' + Auth.getApiToken());
  // }

  public getCountries() {
    return this.http.get('adminision/get_countries?api_token=' + Auth.getApiToken());
  }

  public getMilitaryStatus() {
    return this.http.get('adminision/get_military_status?api_token=' + Auth.getApiToken());
  }

  public getMilitaryAreas() {
    return this.http.get('adminision/get_military_areas?api_token=' + Auth.getApiToken());
  }

  public getParentJobs() {
    return this.http.get('adminision/get_parent_jobs?api_token=' + Auth.getApiToken());
  }

  public updateSetting(data) {
    return this.http.post('adminision/update_setting?api_token=' + Auth.getApiToken(), data);
  }

  public getSettings() {
    return this.http.get('adminision/get_settings?api_token=' + Auth.getApiToken());
  }



  public makeNumber(data: any) {
    return this.http.post('students/set_numbers?api_token=' + Auth.getApiToken(), data);
  }
  public theaterStore(data: any) {
    return this.http.post('theaters/store?api_token=' + Auth.getApiToken(), data);
  }
  public sectionStore(data: any) {
    return this.http.post('academic/student-sections/store?api_token=' + Auth.getApiToken(), data);
  }
  public tableStore(data: any) {
    return this.http.post('academic/student-schedules/store?api_token=' + Auth.getApiToken(), data);
  }
  public groupStore(data: any) {
    return this.http.post('academic/student-groups/store?api_token=' + Auth.getApiToken(), data);
  }
  public theaterEdit(data: any) {
    return this.http.post('theaters/edit?api_token=' + Auth.getApiToken(), data);
  }
  public sectionEdit(data: any) {
    return this.http.post('academic/student-sections-num/update/' + data.id + '?api_token=' + Auth.getApiToken(), data);
  }
  public groupEdit(data: any) {
    return this.http.post('academic/student-groups/update/' + data.id + '?api_token=' + Auth.getApiToken(), data);
  }
  public theaterDestroy(data: any) {
    return this.http.post('theaters/delete?api_token=' + Auth.getApiToken(), data);
  }
  public sectionDestroy(data: any) {
    return this.http.post('academic/student-sections/delete/' + data + '?api_token=' + Auth.getApiToken(), data);
  }
  public tableDestroy(data: any) {
    return this.http.post('academic/student-schedules/delete/' + data + '?api_token=' + Auth.getApiToken(), data);
  }
  public groupDestroy(data: any) {
    return this.http.post('academic/student-groups/delete/' + data + '?api_token=' + Auth.getApiToken(), null);
  }
  public commissionsStore(data: any) {
    return this.http.post('commissions/store?api_token=' + Auth.getApiToken(), data);
  }
  public commissionEdit(data: any) {
    return this.http.post('commissions/edit?api_token=' + Auth.getApiToken(), data);
  }
  public commissionDestroy(data: any) {
    return this.http.post('commissions/delete?api_token=' + Auth.getApiToken(), data);
  }
  public theaters() {
    return this.http.get('account/theaters?api_token=' + Auth.getApiToken());
  }
  public sections(data: any) {
    return this.http.post('academic/student-sections?api_token=' + Auth.getApiToken(), data);
  }
  public tables(data: any) {
    return this.http.post('academic/student-schedules?api_token=' + Auth.getApiToken(), data);
  }
  public groups() {
    return this.http.get('academic/student-groups?api_token=' + Auth.getApiToken());
  }
  public commissions() {
    return this.http.get('account/commissions?api_token=' + Auth.getApiToken());
  }
  public maxSetNumber() {
    return this.http.get('account/max_set_number?api_token=' + Auth.getApiToken());
  }
  public student_distributions(data: any) {
    return this.http.post('student_distributions/store?api_token=' + Auth.getApiToken(), data);
  }
  public student_distributionsNo(data: any) {
    return this.http.post('student_distributions_on_private/store?api_token=' + Auth.getApiToken(), data);
  }
  public student_distributionsTakhlfat(data: any) {
    return this.http.post('student_distributions_on_takhlfat/store?api_token=' + Auth.getApiToken(), data);
  }
  public setNumbersNull(filter : any) {
    return this.http.post('students/set_numbers_null?api_token=' + Auth.getApiToken(), filter);
  }
  public setCommissionsNull(filter : any) {
    return this.http.post('commissions/set_commissions_null?api_token=' + Auth.getApiToken(), filter);
  }
  public setNumbers(filter : any) {
    return this.http.post('students/set_numbers?api_token=' + Auth.getApiToken(), filter);
  }
  public getStudentNumber(data: any) {
    return this.http.post('academic/student-division-num?api_token=' + Auth.getApiToken(), data);
  }
  public student_distributions_number() {
    return this.http.get('account/student_distributions?api_token=' + Auth.getApiToken());
  }

}
