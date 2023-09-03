import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './shared/interceptors';
import { SharedModule } from './shared/shared.module';
import { AuthGuestService } from './shared/middlewares/auth-guest.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthService } from './shared/services/auth.service';
import { LayoutComponent } from './core/layout.component';
import { AppComponent } from './core/app.component';
import { AuthComponent } from './core/auth.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TranslationService } from './shared/services/translation.service';
import { Cache } from './shared/cache';
import { Translation } from './shared/translation';
import { LevelService } from './account/services/level.service';
import { DivisionService } from './account/services/division.service';
import { TermService } from './account/services/term.service';
import { Message } from './shared/message';
import { ApplicationSettingService } from './adminision/services/application-setting.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DataTablesModule } from '../../node_modules/angular-datatables';
import { SystemLabelComponent } from './core/components/system-label/system-label.component';
import { UserService } from './user/services/user.service';
import { RoleService } from './user/services/role.service';
import { Request } from './shared/request';
import { Router } from '@angular/router';
import { AccountModule } from './account/account.module';
import { AcademicModule } from './academic/academic.module';
import { AdminisionModule } from './adminision/adminision.module';
import { AffairsModule } from './affairs/affairs.module';
import { CardModule } from './card/card.module';
import { SettingsModule } from './settings/settings.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { Helper } from './shared/helper';
import { MilitaryModule } from './military/military.module';
import { AuthModule } from './auth/auth.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { StudentsResultsComponent } from './students-results/students-results.component';
@NgModule({
  declarations: [
    LayoutComponent,
    AuthComponent,
    AppComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    SystemLabelComponent,
    StudentsResultsComponent,

  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      progressBar: true,
      closeButton: true,
      enableHtml: true,
    }),
    AppRoutingModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [
    httpInterceptorProviders,
    ApplicationSettingService,
    TranslationService,
    LevelService,
    DivisionService,
    TermService,
    AuthService,
    AuthGuestService,
    UserService,
    RoleService,
    AccountModule,
    AcademicModule,
    AdminisionModule,
    AffairsModule,
    CardModule,
    SettingsModule,
    StudentModule,
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static doc: any = document;

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private levelService: LevelService,
    private termService: TermService,
    private divisionService: DivisionService,
    private applicationSettingService: ApplicationSettingService) {
    Translation.TRANSLATION_DATA = Cache.has(Translation.TRANSLATION_CACHE_KEY) ? Cache.get(Translation.TRANSLATION_CACHE_KEY) : [];

    var self = this;
    //Cache.set(Translation.TRANSLATION_CACHE_KEY, r);
    Request.addToQueue({
      observer: this.translationService.get(), action: (r) => {
        Cache.remove(Translation.TRANSLATION_CACHE_KEY);
        Cache.set(Translation.TRANSLATION_CACHE_KEY, r);
        Translation.TRANSLATION_DATA = r;
      }
    });
    Request.addToQueue({
      observer: this.divisionService.get(), action: (r) => {
        Cache.remove(DivisionService.DIVISION_PREFIX);
        Cache.set(DivisionService.DIVISION_PREFIX, r);
      }
    });
    Request.addToQueue({
      observer: this.levelService.get(), action: (r) => {
        Cache.remove(LevelService.LEVEL_PREFIX);
        Cache.set(LevelService.LEVEL_PREFIX, r);
      }
    });
    Request.addToQueue({
      observer: this.termService.get(), action: (r) => {
        Cache.remove(TermService.TERPM_PREFIX);
        Cache.set(TermService.TERPM_PREFIX, r);
      }
    });

    // load all requests in the queueue
    console.log("request count : " + Request.queue.length);
    Request.fire();

  }

  reloadIfConsoleOpen() {
    if (this.isConsoleOpen()) {
      window.location.href = "https://www.youtube.com/watch?v=6YCq549gdT0";
    };
  }

  isConsoleOpen() {
    var startTime: any = new Date();
    debugger;
    var endTime: any = new Date();

    return endTime - startTime > 100;
  }



}
