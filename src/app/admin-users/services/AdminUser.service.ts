import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IReqUpdateAdminUser} from '../models/IReqUpdateAdminUser';
import {IReqCreateAdminUser} from '../models/IReqCreateAdminUser';
import {IAdminUserChangePassword} from '../models/IAdminUserChangePassword';

@Injectable({providedIn: 'root'})
export class AdminUserService {

  constructor(private http: HttpClient) {
  }

  public getAdminUserList() {
    return this.http.get('account/students');
  }

  public lockFlipping(id: string) {
    return this.http.put('adminUsers/lock', {_id: id});
  }

  public changeAdminUserPassword(data: IAdminUserChangePassword) {
    return this.http.put(`adminUsers/changePassword`, data);
  }

  public getAdminUserDetails(id: string) {
    return this.http.get(`adminUsers/adminUser/${id}`);
  }

  public updateAdminUser(update: IReqUpdateAdminUser) {
    return this.http.put(`adminUsers`, update);
  }

  public deleteAdminUser(id: string) {
    return this.http.delete(`adminUsers/${id}`);
  }

  public createAdminUser(AdminUser: IReqCreateAdminUser) {
    return this.http.post(`adminUsers`, AdminUser);
  }

  public checkEmailExist(email: any) {
    const params = new HttpParams().set('email', email);
    return this.http.get(`adminUsers/checkEmailExist`, {params});
  }

}
