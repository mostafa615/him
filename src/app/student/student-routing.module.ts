import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router'; 
import { StudentComponent } from './student.component';  
import { StudentIndexComponent } from './components/student/student-index/student-index.component';  
import { StudentCreateComponent } from './components/student/student-create/student-create.component';
import { StudentShowComponent } from './components/student/student-show/student-show.component';
const routes: Routes = [ 

  {
    path : "",
    component : StudentComponent,
    children : [
      {
        path: '', 
        component: StudentIndexComponent
      }, 
      {
        path: ':id',
        component: StudentCreateComponent
      }, 
      {
        path: 'show/:id',
        component: StudentShowComponent
      }, 
      {
        path: 'create',
        component: StudentCreateComponent
      }, 
     
     /* {
        path: "settings",
        component: AdminisionComponent,
        children: [
          {
            path: 'required_documents',
            component: RequiredDocumentIndexComponent
          }, 
        ]
      },*/

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
export class StudentRoutingModule {
}
