import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class AcademicSettingService {

  constructor(private http: HttpClient) {
  }

  /**
   * get settings from api
   *
   */
  public get() {
    return this.http.get('academic/settings?api_token=' + Auth.getApiToken());
  }

  /**
   * get update all settings from api
   *
   */
  public update(data) {
    return this.http.post('academic/settings/update?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * get update all settings from api
   *
   */
  public updatePublishResult(data) {
    return this.http.post('academic/settings/update-publish-result?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * get student info for academic module
   *
   */
  public getStudentInfo(id) {
    return this.http.get('academic/get_student_academic?api_token=' + Auth.getApiToken() + "&student_id=" + id);
  }

  public getAcademicPaymentSettings(){
    return this.http.get('academic/payment_settings?api_token=' + Auth.getApiToken());
  }
  public updatePaymentSettings(settings){
    return this.http.post('academic/update/payment_settings?api_token=' + Auth.getApiToken(), {paymentSettings : settings});
  }
}
