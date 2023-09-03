import { Component, Input, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { CourseCategoryService } from '../../services/course-category.service';

@Component({
  selector: 'app-create-course-category-form',
  templateUrl: './create-course-category-form.component.html',
  styleUrls: ['./create-course-category-form.component.scss']
})
export class CreateCourseCategoryFormComponent implements OnInit {

  @Input() courseCategory: any = {};
  @Input() updateView: any;

  isSubmitted = false;
  requiredFields = [
    'name',
    'total_hours',
    'required_hours'
  ];

  constructor(private courseCategoryService: CourseCategoryService) { }

  ngOnInit() {
  }

  validate() {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!this.courseCategory[element])
        valid = false;
    });
    return valid;
  }

  send() {
    if (!this.validate()) {
      return Message.error(Helper.trans('fill all required data'));
    }
    if (this.courseCategory.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.isSubmitted= true;
    this.courseCategoryService.store(this.courseCategory).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      }
      else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
      this.updateView();
    });
  }

  update() {
    this.isSubmitted= true;
    this.courseCategoryService.update(this.courseCategory).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      }
      else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
      this.updateView();
    });
  }

}
