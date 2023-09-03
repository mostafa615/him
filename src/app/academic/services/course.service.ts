import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public $: any = $;

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public get() {
    return this.http.get('academic/courses?api_token=' + Auth.getApiToken());
  }


  public getHistory() {
    return this.http.get('academic/courses_history?api_token=' + Auth.getApiToken());
  }

  public getopenCourses() {
    return this.http.get('academic/all_open_courses?api_token=' + Auth.getApiToken());
  }
  
  /**
   * store new service
   */
  public store(data: any) {
    return this.http.post('academic/courses/store' + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * update service
   */
  public update(data: any) {
    return this.http.post('academic/courses/update/' + data.id + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * remove service
   */
  public destroy(id) {
    return this.http.post('academic/courses/delete/' + id + '?api_token=' + Auth.getApiToken(), null);
  }


  /**
   * get open courses api
   *
   */
  public getOpenCourses() {
    return this.http.get('academic/open_courses?api_token=' + Auth.getApiToken());
  }

  /**
   * update open courses
   */
  public updateOpenCourses(data: any) {
    return this.http.post('academic/open_courses/update?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * update open courses
   */
   public updateOpenCoursesExamSchedule(data: any) {
    return this.http.post('academic/course-update-exam-schedule?api_token=' + Auth.getApiToken(), data);
  }


  /**
   * get open courses api
   *
   */
  public getAvailableCourses(data) {
    return this.http.get('academic/available_courses?api_token=' + Auth.getApiToken()+"&"+$.param(data));
  }

 

  /**
   * get open courses api
   *
   */
  public updateRegisterCourses(data) {
    return this.http.post('academic/register_courses/update?api_token=' + Auth.getApiToken(), data);
  }

}
