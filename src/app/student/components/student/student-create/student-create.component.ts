import { Component, OnInit } from '@angular/core';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { Cache } from '../../../../shared/cache';
import { LevelService } from '../../../../account/services/level.service';
import { AppModule } from '../../../../app.module';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { ApplicationSettingService } from '../../../../adminision/services/application-setting.service';
import { StudentService } from '../../../services/student.service';
import { DivisionService } from '../../../../account/services/division.service';
import { HashTable } from 'angular-hashtable';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  public doc: any = AppModule.doc;
  /**
   * application object
   */
  public application: any = {};

  public applicationSettings = ApplicationSettingService;

  public defaultImage: string = '/assets/img/avatar.png';

  public isSubmitted: any = false;

  public gradeError: string;

  public currentError: string;

  public isUpdate = false;

  public levels: any;
  public divisions: any;

  public requiredDocumentList = new HashTable<any, any>();

  public required_field = [
    'name',
    'qualification_id',
    'national_id' ,
    'registration_status_id',
    'academic_years_id',
    'grade',
    'qualification_date',
    'qualification_types_id',
    'level_id',
    'department_id',
    // 'case_constraint_id',
    'division_id',
    'gender'
  ];

  public col = "col-lg-10 col-md-10 col-sm-12";

  constructor(private studentService: StudentService, private route: ActivatedRoute , private globalService : GlobalService) {
    const id = this.route.snapshot.params['id'];
    if (id > 0) {
      !Auth.can('student_edit')? exit() : '';
      this.loadApplication(id);
      this.isUpdate = true;
    } else {
      !Auth.can('student_add')? exit() : '';
    }

    this.route.queryParams.subscribe((params) => {
      let col = params['col'];
      if (col)
        this.col = col;
    });
  }

  loadApplication(id) {
    this.studentService.load(id).subscribe((res: any) => {
      
      // -----new load registration status documents
      this.globalService.get('adminision/get_registeration_status_document').subscribe(documents => {
        this.applicationSettings.REGSITERATIN_STATUS_DOCUMENTS = documents
        this.validateOnRegisterationStatusDocument(res.registration_status_id)
      })


      this.application = res;
    });
  }

  validate() {
    let valid = true;

    this.required_field.forEach(element => {
      if (!this.application[element])
        valid = false;
    });

    return valid;
  }

  validateOnRegisterationStatusDocument(registration_status_id=this.application.registration_status_id) {
    this.requiredDocumentList = new HashTable();
    this.applicationSettings.REGSITERATIN_STATUS_DOCUMENTS.forEach(element => {
      if (element.registeration_status_id	 == registration_status_id) {
        this.requiredDocumentList.put(element.required_document_id, 1);
      }
    });
  }

  sendApplication() {
    if (!this.validate()) {
      this.setCurrentError(Helper.trans('fill all requird data'));
      return Message.error(Helper.trans('fill all requird data'));
    }
    if (this.isUpdate)
      this.performUpdateApplication();
    else
      this.performSendApplication();
  }

  performUpdateApplication() {
    this.isSubmitted = true;
    let data = new FormData();
    for(let key of Object.keys(this.application)) {
      if(this.application[key])
        data.append(key, this.application[key]);
    }

    //return console.log(data);
    this.studentService.update(data).subscribe((res)=>{
      const data: any = res;

      if (data.status == 1)  {
        Message.success(data.message);
      }
      else {
        Message.error(data.message);
        this.setCurrentError(data.message);
      }
      this.isSubmitted = false;
    });
  }

  performSendApplication() {
    this.isSubmitted = true;
    let data = new FormData();
    for(let key of Object.keys(this.application)) {
      if(this.application[key])
      // console.log(key , this.application[key]);
      
        data.append(key, this.application[key]);
    }

    // return console.log(data);
    
    this.studentService.store(data).subscribe((res)=>{
      console.log(res);
      
      const data: any = res;

      if (data.status == 1)  {
        Message.success(data.message);
        this.reset();
      }
      else {
        Message.error(data.message);
        this.setCurrentError(data.message);
      }

      this.isSubmitted = false;
    });
  }

  reset() {
    this.application = {};
    this.currentError = '';
  }

  setCurrentError(error) {
    if (!error)
      return;
    error = error.replace(/<br>/g, '\n');
    this.currentError = error;
  }

  toggle(selector) {
    if (selector) {
      this.doc.jquery('.application-panel').slideUp(500);
      this.doc.jquery('.'+selector).slideDown(500);
    } else {
      this.doc.jquery('.application-panel').slideDown(500);
    }
  }


  setFile(event, key, required_document_id=null) {
    this.application[key] = event.target.files[0];
    console.log(this.application[key]);

    if (required_document_id) {
      if (!this.application[key])
        this.requiredDocumentList.put(required_document_id, 1);
      else
        this.requiredDocumentList.put(required_document_id, 2);
    }
  }

  viewPersonalImage(event) {
    this.setFile(event, 'personal_photo');
    var reader = new FileReader();
    reader.readAsDataURL(this.application.personal_photo);
    reader.onload = (_event) => {
      this.application.personal_photo_url = reader.result;
    }
  }

  emptyData() {
    this.application.qualification_types_id = null;
    this.application.level_id = null;
    this.application.level_name = null;
    this.application.grade = 0;
  }

  filterDataBaisedOnGender() {
    /*if (this.application.gender == 'female') {
      this.doc.jquery('.military-info-panel').hide();
      this.doc.jquery('.military-info-button').hide();
    } else {
      this.doc.jquery('.military-info-panel').show();
      this.doc.jquery('.military-info-button').show();
    }*/
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    //
    this.application.old_balance_notes = "باقى رسوم سابقه عن عام ";
  }

}
