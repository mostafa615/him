import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingService {

  constructor(private http: HttpClient) {
  }

  getSystemSetting() {
    return this.http.get('system-setting?api_token='+Auth.getApiToken());
  }

  getNotifications() {
    return this.http.get('notifications?api_token='+Auth.getApiToken());
  }
  get_numbers() {
    return this.http.post('students/get_students_setnumbers?api_token=' + Auth.getApiToken() , {data: 'data'});
  }
}
