import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { Cache } from '../../../../shared/cache';
import { LevelService } from '../../../../account/services/level.service';
import { AppModule } from '../../../../app.module';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { StudentService } from '../../../services/student.service';
import { ApplicationSettingService } from '../../../../adminision/services/application-setting.service';

@Component({
  selector: 'app-student-show',
  templateUrl: './student-show.component.html',
  styleUrls: ['./student-show.component.scss']
})
export class StudentShowComponent implements OnInit {

  public doc: any = AppModule.doc;
  /**
   * student object
   */
  public student: any = {};

  public studentSettings = ApplicationSettingService;
  public applicationSettings = ApplicationSettingService;



  public defaultImage: string = '/assets/img/avatar.png';

  public isSubmitted: any = false;

  public gradeError: string;

  public currentError: string;

  @Input() studentData: any = null;

  constructor(private studentService: StudentService, private route: ActivatedRoute) {

    if (this.studentData) {
      this.loadApplication(this.studentData.id);
    } else {
      this.route.params.subscribe((params) => {
        const id = params['id'];
        if (id > 0) {
          this.loadApplication(id);
        }
      });
    }
  }

  loadApplication(id) {
    this.studentService.load(id).subscribe((res: any) => {
      this.student = res;
      this.setLevel();
    });
  }

  toggle(selector) {
    if (selector) {
      this.doc.jquery('.student-panel').slideUp(500);
      this.doc.jquery('.'+selector).slideDown(500);
    } else {
      this.doc.jquery('.student-panel').slideDown(500);
    }
  }

  setLevel() {
    const levels = Cache.get(LevelService.LEVEL_PREFIX);
    levels.forEach(element => {
      if (element.id  == this.student.level_id)
        this.student.level_name = element.name;
    });
  }

  ngOnInit() {
  }

}
