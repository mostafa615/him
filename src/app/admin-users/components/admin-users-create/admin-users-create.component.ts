import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../../../shared/AppValidators';
import { IReqCreateAdminUser } from '../../models/IReqCreateAdminUser';
import { AdminUserService } from '../../services/AdminUser.service';
import { GeneralService } from '../../../shared/services/general.service';

@Component({
  selector: 'app-admin-users-create',
  templateUrl: './admin-users-create.component.html'
})
export class AdminUsersCreateComponent implements OnInit {
  public AdminUserForm: FormGroup;
  public errorMessage = '';
  public emailError = '';
  public passError = '';
  public isSubmitClick = false;

  constructor(private generalService: GeneralService,
    private adminUserService: AdminUserService,
    private router: Router,
    private toaster: ToastrService) {
  }

  ngOnInit() {
    this.AdminUserForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        AppValidators.shouldNotStartWithSpace('')
      ]),
      email: new FormControl(
        null,
        [Validators.required, AppValidators.email]
      ),
      role: new FormControl('', [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(35)]),
    });

  }

  create() {
    this.errorMessage = '';
    this.emailError = '';
    this.passError = '';
    if (this.AdminUserForm.invalid) {
      this.errorMessage = 'Please insert a valid data';
      return;
    }
    this.isSubmitClick = true;
    const admin = this.AdminUserForm.value as IReqCreateAdminUser;

    this.adminUserService.createAdminUser(admin).subscribe(
      () => {
        this.router.navigate(['/admin/adminUsers/list']).then(() => {
          this.toaster.success('Admin User has been Added successfully', 'Done');
        }).catch();
      },
      (e) => {
        this.isSubmitClick = false;
        if (e.status == 400) {
          this.errorMessage = 'Please insert a valid data';
          for (let i = 0; i < e.error.errors.length; i++) {
            if (e.error.errors[i].input === 'email') {
              this.emailError = e.error.errors[i].message;
            }
          }
        }
      }
    );
  }

  get name() {
    return this.AdminUserForm.get('name');
  }

  get email() {
    return this.AdminUserForm.get('email');
  }

  get role() {
    return this.AdminUserForm.get('role');
  }

  get password() {
    return this.AdminUserForm.get('password');
  }
}
