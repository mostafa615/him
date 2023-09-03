import { Component, OnInit } from '@angular/core';
import { ApplicationSettingService } from '../../../services/application-setting.service';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { ApplicationService } from '../../../services/application.service';
import { Cache } from '../../../../shared/cache';
import { LevelService } from '../../../../account/services/level.service';
import { AppModule } from '../../../../app.module';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-application-show',
  templateUrl: './application-show.component.html',
  styleUrls: ['./application-show.component.scss']
})
export class ApplicationShowComponent implements OnInit {

  public doc: any = AppModule.doc;
  /**
   * application object
   */
  public application: any = {};

  public applicationSettings = ApplicationSettingService;
  public studentSettings = ApplicationSettingService;


  public defaultImage: string = '/assets/img/avatar.png';

  public isSubmitted: any = false;

  public gradeError: string;

  public currentError: string;
 
  constructor(private applicationService: ApplicationService, private route: ActivatedRoute) { 
    
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id > 0) {
        this.loadApplication(id); 
      }
    });
  }

  loadApplication(id) {
    this.applicationService.load(id).subscribe((res: any) => {
      this.application = res;
      console.log(res);
      
      this.setLevel();
    });
  }
 
  toggle(selector) {
    if (selector) {
      this.doc.jquery('.application-panel').slideUp(500);
      this.doc.jquery('.'+selector).slideDown(500);
    } else {
      this.doc.jquery('.application-panel').slideDown(500);
    }
  }
 
  setLevel() {
    const levels = Cache.get(LevelService.LEVEL_PREFIX);
    levels.forEach(element => {
      if (element.id  == this.application.level_id)
        this.application.level_name = element.name;
    });
  }
  
  ngOnInit() {
  }

}
