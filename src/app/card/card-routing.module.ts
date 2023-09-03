import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { Auth } from '../shared/auth';
import { AuthGuestService } from '../shared/middlewares/auth-guest.service';
import { CardComponent } from './card.component';
import { CardExportReportComponent } from './components/report/card-export-report/card-export-report.component';
import { SettingsComponent } from './components/report/settings/settings.component';

const routes: Routes = [
   {
    path: "",
    component: null,
    children: [
      {
        path: '',
        canActivate: [AuthGuestService],
        data: {can: Auth.can('card_export')},
        component: CardComponent
      },
      {
        path: 'report/card-export',
        canActivate: [AuthGuestService],
        data: {can: Auth.can('card_export_report')},
        component: CardExportReportComponent
      },  
      {
        path: 'report/settings',
        canActivate: [AuthGuestService],
        data: {can: Auth.can('card_settings')},
        component: SettingsComponent
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
export class CardRoutingModule {
}
