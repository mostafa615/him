import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public get() {
    return this.http.get('academic/doctors?api_token=' + Auth.getApiToken());
  }

  /**
   * store new service
   */
  public store(data: any) {
    return this.http.post('academic/doctors/store' + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * update service
   */
  public update(data: any) {
    return this.http.post('academic/doctors/update/' + data.id + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * remove service
   */
  public destroy(id) {
    return this.http.post('academic/doctors/delete/' + id + '?api_token=' + Auth.getApiToken(), null);
  }
}
