import { Component, OnInit } from '@angular/core';
import { DivisionService } from 'src/app/account/services/division.service';
import { LevelService } from 'src/app/account/services/level.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
@Component({
  selector: 'app-register-exams-schedule',
  templateUrl: './register-exams-schedule.component.html',
  styleUrls: ['./register-exams-schedule.component.scss']
})
export class RegisterExamsScheduleComponent implements OnInit {
  levels: any = [];
  divisions: any = [];
  constructor() { }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
  }

}
