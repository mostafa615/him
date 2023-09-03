import {Component, OnInit} from '@angular/core';
import {IResAdminUserList} from '../../models/IResAdminUserList';
import {AdminUserService} from '../../services/AdminUser.service';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html'
})
export class AdminUsersListComponent implements OnInit {
  public errorMessage = '';
  public adminUsers: IResAdminUserList[] = null;
  public isListDataLoaded = false;

  constructor(
    private adminService: AdminUserService
  ) {
  }

  ngOnInit() {
    this.callHttp();
  }

  callHttp(): void {
    this.adminService.getAdminUserList().subscribe(
      (res: any) => {
        this.adminUsers = res;
        this.isListDataLoaded = true;
      }
    );
  }

}
