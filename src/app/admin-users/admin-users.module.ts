import {NgModule} from '@angular/core';
import {AdminUsersRoutingModule} from './admin-users-routing.module';
import {AdminUsersEditComponent} from './components/admin-users-edit/admin-users-edit.component';
import {AdminUsersCreateComponent} from './components/admin-users-create/admin-users-create.component';
import {AdminUsersListComponent} from './components/admin-users-list/admin-users-list.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminUsersListComponent,
    AdminUsersCreateComponent,
    AdminUsersEditComponent
  ],
  imports: [
    SharedModule,
    AdminUsersRoutingModule
  ]
})
export class AdminUsersModule {
}
