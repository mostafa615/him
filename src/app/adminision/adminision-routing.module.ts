import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminisionComponent } from './adminision.component';
import { RequiredDocumentIndexComponent } from './components/required_document/required-document-index/required-document-index.component';
import { ApplicationCreateComponent } from './components/application/application-create/application-create.component';
import { ApplicationIndexComponent } from './components/application/application-index/application-index.component';
import { ApplicationShowComponent } from './components/application/application-show/application-show.component';
import { ApplicationRequiredComponent } from './components/application-required/application-required.component';
import { AdminisionSettingComponent } from './components/adminision-setting/adminision-setting.component';
// import { RegistrationtypeComponent } from './components/registrationtype/registrationtype.component';

const routes: Routes = [
  {
    path: 'application',
    component: ApplicationIndexComponent
  },
  {
    path: 'application/:id',
    component: ApplicationCreateComponent
  },
  {
    path: 'application/show/:id',
    component: ApplicationShowComponent
  },
  {
    path: 'application/create',
    component: ApplicationCreateComponent
  },
  {
    path: "settings",
    component: AdminisionComponent,
    children: [
      {
        path: '',
        component: AdminisionSettingComponent
      },
      // {
      //   path: 'registrationtype',
      //   component: RegistrationtypeComponent
      // },
      {
        path: 'required_documents',
        component: RequiredDocumentIndexComponent
      },
      {
        path: 'application_required',
        component: ApplicationRequiredComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminisionRoutingModule {
}
