import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminUsersListComponent} from './components/admin-users-list/admin-users-list.component';
import {AdminUsersEditComponent} from './components/admin-users-edit/admin-users-edit.component';
import {AdminUsersCreateComponent} from './components/admin-users-create/admin-users-create.component';


const routes: Routes = [
  {
    path: 'list',
    component: AdminUsersListComponent
  },
  {
    path: 'create',
    component: AdminUsersCreateComponent
  },
  {
    path: 'edit/:_id',
    component: AdminUsersEditComponent

  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule {
}
