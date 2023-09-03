import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRequiredService {

  constructor(private http: HttpClient) {
  }
  /**
   * get services from api
   *
   */
  public get() {
    return this.http.get('adminision/application_requireds?api_token=' + Auth.getApiToken());
  }
  
  /**
   * update service
   */
  public update(data) { 
    return this.http.post('adminision/application_requireds/update'  + '?api_token=' + Auth.getApiToken(), data);
  }
}
