import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IReqUpdateAdminUser } from '../../models/IReqUpdateAdminUser';
import { AdminUserService } from '../../services/AdminUser.service';
import { AppValidators } from '../../../shared/AppValidators';
import { GeneralService } from '../../../shared/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { IAdminUserChangePassword } from '../../models/IAdminUserChangePassword';
import { IAdminUserDetails } from "../../models/IAdminUserDetails";

@Component({
  selector: 'app-admin-users-edit',
  templateUrl: './admin-users-edit.component.html'
})
export class AdminUsersEditComponent implements OnInit {

  private id: string;
  public currentAdminUser: IAdminUserDetails;
  public AdminUserForm: FormGroup;
  public errorMessageChangePassword = '';
  public isSubmitChangePasswordClick = false;
  public ChangePasswordForm: FormGroup;
  public passwordError = '';
  public cPasswordError = '';
  public successMessage = null;
  public errorMessage = '';
  public emailError = '';
  public passError = '';
  public isListDataLoaded = false;
  public isSubmitClick = false;


  constructor(
    private generalService: GeneralService,
    private adminUserService: AdminUserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params._id;
    this.AdminUserForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        AppValidators.shouldNotStartWithSpace('')
      ]),
      email: new FormControl(
        null,
        [Validators.required, AppValidators.email],
        // [AppValidators.userUniqueEmail(this.adminUserService, this.id)]
      ),
      role: new FormControl(null, [Validators.required]),
      active: new FormControl(null, [Validators.required])
    });
    this.getAdminUserById();
    this.ChangePasswordForm = this.fb.group(
      {
        password: [null, [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(6),
          AppValidators.shouldNotStartWithSpace(''),
        ]],
        confirmPassword: [null, [Validators.required]]
      },
      {
        validator: [AppValidators.passwordMatchValidator]
      }
    );
  }


  getAdminUserById() {
    this.adminUserService.getAdminUserDetails(this.id).subscribe(
      (adminUser: any) => {
        this.currentAdminUser = adminUser;
        this.isListDataLoaded = true;
        this.name.setValue(this.currentAdminUser.name);
        this.email.setValue(this.currentAdminUser.email);
        this.role.setValue(this.currentAdminUser.role);
        if (this.currentAdminUser.active)
          this.active.setValue('Active');
        else
          this.active.setValue('Inactive');
      }
    );
  }

  update() {
    this.errorMessage = '';
    this.successMessage='';
    this.emailError = '';
    if (!this.AdminUserForm.valid) {
      this.errorMessage = 'Please insert a valid data';
      return;
    }
    this.isSubmitClick = true;
    const update = this.AdminUserForm.value as IReqUpdateAdminUser;
    if (this.AdminUserForm.value.active == 'Active')
      update.active = true
    else
      update.active = false

    update.adminUserId = this.currentAdminUser._id;
    this.adminUserService.updateAdminUser(update).subscribe(
      () => {
        this.successMessage = `this Admin User has been updated successfully`;
        this.isSubmitClick = false;
      },
      (e) => {
        this.isSubmitClick = false;
        if (e.status === 400) {
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

  createChangePassword() {
    this.errorMessageChangePassword = '';
    this.passwordError = '';
    this.cPasswordError = '';
    if (this.ChangePasswordForm.invalid) {
      this.toaster.error('Please insert a valid data', 'Failed');
      return;
    }
    this.isSubmitChangePasswordClick = true;
    const data: IAdminUserChangePassword = {
      adminUserId: this.id,
      password: this.password.value,
      confirmPassword: this.password.value
    };
    this.adminUserService.changeAdminUserPassword(data).subscribe(
      () => {
        this.toaster.success('Admin User Password has been Changed', 'Done');
        this.isSubmitChangePasswordClick = false;
        this.ChangePasswordForm.reset();
      },
      (e) => {
        this.toaster.error(e.error.message, 'Error');
        this.isSubmitChangePasswordClick = false;
        this.errorMessageChangePassword = e.message;
        if (e.status === 400 || e.status === 409) {
          for (let i = 0; i < e.error.length; i++) {
            if (e.error[i].input === 'email') {
              this.emailError = e.error[i].message;
            }
          }
        }
      }
    );
  }

  get password() {
    return this.ChangePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.ChangePasswordForm.get('confirmPassword');
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

  get active() {
    return this.AdminUserForm.get('active');
  }

}
