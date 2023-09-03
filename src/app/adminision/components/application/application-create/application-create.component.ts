import { Component, OnInit } from '@angular/core';
import { ApplicationSettingService } from '../../../services/application-setting.service';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { ApplicationService } from '../../../services/application.service';
import { Cache } from '../../../../shared/cache';
import { LevelService } from '../../../../account/services/level.service';
import { AppModule } from '../../../../app.module';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { HashTable } from '../../../../../../node_modules/angular-hashtable';
import { Request } from 'src/app/shared/request';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';
import { Router } from '@angular/router';
import { ApplicationHelper } from '../application-helper';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.scss']
})
export class ApplicationCreateComponent implements OnInit {
  levels: any = [];
  level_id:any;
  filter: any = {};
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

  public isAzhar = false;

  public qualificationGrade = 0;

  public requiredDocumentList = new HashTable<any, any>();

  public differentYearRequired = 0;

  public appHelper = ApplicationHelper;

  public $: any = $;

  public required_field = [
    'name',
    // 'qualification_id',
    'national_id' ,
    // 'registration_status_id',
    // 'academic_years_id',
    // 'grade',
    // 'maxgrade',
    // 'qualification_date',
    // 'qualification_types_id',
    // 'level_id'
    //'case_constraint_id'
  ];

  public col = "col-lg-10 col-md-10 col-sm-12";
  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private applicationSettingService: ApplicationSettingService,
    private globalService : GlobalService
    ) {
    this.applicationSettingService.queueRequests();
    Request.fire(false, () => {
      this.setDefaultYear();
    });
    const id = this.route.snapshot.params['id'];
    if (id > 0) {
      !Auth.can('application_edit')? exit() : '';
      this.loadApplication(id);
      this.isUpdate = true;
    } else {
      !Auth.can('application_add')? exit() : '';
      //
      this.setDefaultYear();
      this.application.registeration_date = new Date().toISOString().substring(0, 10);
    }

    this.route.queryParams.subscribe((params) => {
      let col = params['col'];
      if (col)
        this.col = col;
    });
  }

  setDefaultYear() {
    this.application.academic_years_id = 9;
    this.watchLevel();
    /*ApplicationSettingService.ACADEMIC_YEARS.forEach(element => {
      if (element.id == 8) {
        this.application.
      }
    });*/
  }

  loadApplication(id) {
    this.applicationService.load(id).subscribe((res: any) => {
      this.application = res;
      //
      // this.application.qualification_date = this.application.qualification_date;
    
    
      // -----new load registration status documents
      this.globalService.get('adminision/get_registeration_status_document').subscribe(documents => {
        this.applicationSettings.REGSITERATIN_STATUS_DOCUMENTS = documents
        this.validateOnRegisterationStatusDocument(res.registration_status_id)
      })

      this.application = res;
    
    
    });
  }

  validateOnNationalId() {
    var message = Helper.trans("national id is not valid");
    var self = this;

    // get birth date from national id
    this.application.birthdate = ApplicationHelper.getBirthdate(this.application.national_id);
    this.calculateAge();

    // get gender from national id
    this.application.gender = ApplicationHelper.getGenderFromNationalId(this.application.national_id);

    /*if (!ApplicationHelper.validateOnNationalId(this.application.national_id, this.application.birthdate)) {

      this.setCurrentError(message);
      Message.confirm(message, function(){
        self.$('.national_id')[0].focus();
      }, () => {
        self.$('.national_id')[0].focus();
      });

    } else {
      this.setCurrentError("");
    }*/

    // set gender
  }

  calculateAge() {
    if (!this.application.birthdate)
      return 0;

    var years = 0;
    try {
      var calcDate = new Date();
      calcDate.setMonth(9);
      calcDate.setDate(1);

      var birthdate = this.application.birthdate;
      var bDate = new Date(birthdate);

      var diffTime = calcDate.getTime() - bDate.getTime();
      console.log("diffTime : ", diffTime);

      years = parseInt((diffTime / (24 * 60 * 60 * 1000 * 365)) + "");
      this.application.years = years;
    } catch (error) {
      console.log(error);
    }
    return years;
  }

  validateOnAge() {
    var message = "عمر الطالب اكبر من 22 سنه هل انت موافق بالاستمرار";
    this.calculateAge();
    var self = this;

    if (this.application.years >= 22) {
      Message.confirm(message, function(){
        // do noting if ok
      }, () => {
        Helper.refreshComponent(self.router, "/affairs");
      });
    } else {
    }
  }

  validate() {
    let valid = true;

    this.required_field.forEach((element: any) => {
      if (!this.application[element]){
        console.log(element);
        valid = false;
  
      }     
    });

    return valid;
  }

  calculatePercent() {
    var percent = 0;
    var total = 0;
    var total2 = 0;



    console.log('in percent func');
    this.applicationSettings.QUALIFICATION_TYPES.forEach((element: any) => {
      if (this.application.qualification_types_id == element.id) {
        total = element.grade;
        total2 = element.maxgrade;
           console.log(total2);
      }
    });
    
    // this.applicationSettings.QUALIFICATIONS.forEach(element => {
    //   if (this.application.qualification_id == element.id) {
    //     total = element.maxgrade;
    //   }
    // });
    //maxgrade this.application.maxgrade
    //console.log(this.application.maxgrade);
    percent = (this.application.grade / 410) * 100;
    this.application.percent = percent.toFixed(2);
    // console.log(this.application.maxgrade);
    // console.log(total2);

  }

  


  validateOnRegisterationStatusDocument(registration_status_id=this.application.registration_status_id) {
    this.requiredDocumentList = new HashTable();
    this.applicationSettings.REGSITERATIN_STATUS_DOCUMENTS.forEach(element => {
      if (element.registeration_status_id	 == registration_status_id) {
        this.requiredDocumentList.put(element.required_document_id, 1);
      }
    });

    this.changeIfMakasa();
  }


  changeIfMakasa() {
    if (this.application.registration_status_id == 4) {
      this.application.level_id = 2;
      this.setLevel();
    }
  }

  validateOnQualificationDate() {
    if (!this.application.qualification_date)
      return false;

    try {
      this.differentYearRequired = 0;
      this.applicationSettings.SETTINGS.forEach((element: any) => {
        if (element.id == 5)
          this.differentYearRequired = element.value;
      });
      // current year
      let currentYear = new Date().getFullYear();
      console.log(currentYear);
      
      // let qualificationYear = parseInt(this.application.qualification_date);
      //new Date(this.application.qualification_date).getFullYear();
      // let differentYear = currentYear - qualificationYear;

      // console.log(differentYear);
      // if (differentYear > this.differentYearRequired)
      //   return false;
    } catch (error) {
      return false;
    }

    return true;
  }

  sendApplication() {
    if (!this.validate()) {
      this.setCurrentError(Helper.trans('fill all requird data'));
      return Message.error(Helper.trans('fill all requird data'));
    }
    //  let currentYear = new Date().getFullYear();
    //   console.log(currentYear);
    // if (!this.validateOnQualificationDate())
    //   return Message.error(Helper.trans('different year of qualification must be less of equal than ' + this.differentYearRequired));


    // var date = new Date();
    // date.setFullYear(this.application.qualification_date);
    // this.application.qualification_date = date.toISOString().substring(0,10);

    if (this.isUpdate)
      this.performUpdateApplication();
    else {
        this.performSendApplication();
    }
  }

  performUpdateApplication() {
    this.isSubmitted = true;
    let data = new FormData();
    for(let key of Object.keys(this.application)) {
      if(this.application[key])
        data.append(key, this.application[key]);
    }

    //return console.log(data);
    this.applicationService.update(data).subscribe((res)=>{
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
        data.append(key, this.application[key]);
    }
    this.applicationService.store(data).subscribe((res)=>{
      const data: any = res;

      if (data.status == 1)  {
        Message.warning("", data.message, ()=> {});
        //Message.success(data.message);
        this.reset();
      }
      else {
        console.log(data.message);
        
        Message.error(data.message);
        this.setCurrentError(data.message);
      }

      this.isSubmitted = false;
    });
  }

  reset() {
    this.application = {};
    this.application.registeration_date = new Date().toISOString().substring(0, 10);
    this.setLevel();
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

  //******************************************* */
  // level methods
  //******************************************* */

  watchLevel() {
    this.calculateLevel();
    this.calculatePercent();
    this.setLevel();
  }

  calculateLevel() {
    const qualificationsTypes = this.applicationSettings.QUALIFICATION_TYPES;
    let levelId = null;
    let changes = false;
    let requiredGrade: any = null;
    let requiredPercent: any = null;
    qualificationsTypes.forEach((element: any) => {
      var condition: boolean = false;



      if (element.id == this.application.qualification_types_id) {
        requiredGrade = element.grade;
        if (element.percent) {
          requiredPercent = element.percent;
          this.application.requiredPercent = element.percent;
        }

        this.qualificationGrade = requiredGrade;
      }

      if (requiredPercent) {
        condition = element.id == this.application.qualification_types_id &&
        element.percent <= this.application.grade;
      } else {
        condition = element.id == this.application.qualification_types_id &&
        element.grade <= this.application.grade;
      }

      if (condition) {
        levelId = element.level_id;
        changes = true;
      }
    });

    if (requiredGrade && this.application.registration_status_id != 4 && !requiredPercent) {
      this.gradeError = Helper.trans('grade must be equal or bigger than ') + ' : ' + requiredGrade;
      console.log("requiredGrade < this.application.grade", requiredGrade , this.application.grade);
      if (requiredGrade > this.application.grade) {
        this.setCurrentError(this.gradeError);
        Message.warning("", this.gradeError, () => {});
      }
    }/* else if (requiredPercent && this.application.registration_status_id != 4) {
      this.gradeError = Helper.trans('percent must be equal or bigger than ') + ' : ' + requiredPercent + " %";

      if (requiredPercent > this.application.grade) {
        this.setCurrentError(this.gradeError);
        Message.warning("", this.gradeError, () => {});
      }
    }*/ else {
      this.setCurrentError("");
    }

    if (!this.validateOnPercent())
      return;

    if (!changes) {
      levelId = null;
    } else {
      this.gradeError = null;
      this.setCurrentError("");
    }

    this.application.level_id = levelId;

    this.changeIfMakasa();
  }

  validateOnPercent() {
      if (this.application.requiredPercent > this.application.grade && this.application.qualification_types_id) {

        this.gradeError = Helper.trans('percent must be equal or bigger than ') + ' : ' + this.application.requiredPercent + " %";
        this.setCurrentError(this.gradeError);
        Message.warning("", this.gradeError, () => {});

        return false;
      }
      else
        return true;
  }

  setLevel() {
    const levels = Cache.get(LevelService.LEVEL_PREFIX);
    levels.forEach((element: any) => {
      if (element.id  == this.application.level_id)
        this.application.level_name = element.name;
        this.application.level_id = 1;

    });
  }

  getQualificationGrade(qualificationId=null) {
    let grade = 0;
    if (!qualificationId)
      qualificationId = this.application.qualification_id;
    this.applicationSettings.QUALIFICATIONS.forEach((element: any) => {
      if (element.id == qualificationId)
        grade = element.grade;
    });
    return grade;
  }


  checkIfAzhar() {
    if (this.application.qualification_id == 4)
      this.isAzhar = true;
    else
      this.isAzhar = false;

    if (this.application.azhar_total_grade &&
      this.application.azhar_religious_grade_total &&
      this.application.qualification_id == 4) {
        this.application.azhar_remind_grade = this.application.azhar_total_grade - this.application.azhar_religious_grade_total;
        let grade = this.getQualificationGrade(1) * this.application.azhar_remind_grade;
        grade /= this.qualificationGrade;
        this.application.grade = grade.toFixed(2);

        this.watchLevel();
      }
  }

  // emptyData() {
  //   this.application.qualification_types_id = null;
  //   this.application.level_id = null;
  //   this.application.level_name = null;
  //   this.application.grade = 0;
  // }

  filterDataBaisedOnGender() {
    if (this.application.gender == 'female') {
      this.doc.jquery('.military-info-panel').hide();
      this.doc.jquery('.military-info-button').hide();
    }
  }

  ngOnInit() {
    $('#level_id').on('change' , ()=>{
      this.level_id = $('#level_id').val();
    })
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

}