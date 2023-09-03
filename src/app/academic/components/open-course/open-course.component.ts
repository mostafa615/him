import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/account/services/level.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { CourseService } from '../../services/course.service';
import { TermService } from 'src/app/account/services/term.service';

@Component({
  selector: 'app-open-course',
  templateUrl: './open-course.component.html',
  styleUrls: ['./open-course.component.scss']
})
export class OpenCourseComponent implements OnInit {

  courses: any = [];
  openCourses: any = [];
  levels: any = [];
  levels1: any = [];
  divisions: any = ApplicationSettingService.DIVISIONS;
  selectedLevels: any = [];
  isSubmitted = false;
  filter: any = {};
  terms: any = [];
  stages: any = ["الاولي", "الثانيه"];
  term_id:any;

  constructor(private courseService: CourseService,private termService:TermService) { }

  ngOnInit() {
    this.filter.term = 0;
    this.filter.level_id = 0;
    this.filter.stage = 0;
    this.filter.division_id = 0;
    this.loadCourses();
    $('#term_id').on('change',()=>{
      this.term_id =$('#term_id').val();
    })
  }

  loadCourses() {
    this.courseService.get().subscribe((res)=> {
      this.courses = res;
      this.loadLevels();
      this.loadOpenCourses();
    });
    this.terms = Cache.get(TermService.TERPM_PREFIX);
  }

  selectCourse(course) {
    this.courses.forEach(element => {
      if (course.id == element.id)
        element.selected = 1;
    });
  }

  loadOpenCourses() {
    this.courseService.getOpenCourses().subscribe((res)=> {
      this.openCourses = res;
      //
      this.openCourses.forEach(element => {
        this.selectCourse(element);
      });
    });
  }

  loadLevels() {
    this.levels1 = Cache.get(LevelService.LEVEL_PREFIX);
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.levels.forEach(element => {
      // assign courses to levels
      element.courses = [];
      this.courses.forEach(course => {
        if (course.level_id == element.id) {
          element.courses.push(course);
        }
      });
    });
  }

  updateOpenCourses() {
    let arr = [];
    this.courses.forEach(element => {
      if (element.selected)
        arr.push(element);
    });

    let data ={
      courses: arr
    };

    this.isSubmitted= true;
    this.courseService.updateOpenCourses(data).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      }
      else
        Message.error(res.message);
      this.isSubmitted = false;
    });
  }



}
