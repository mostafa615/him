import { Component, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { LevelService } from 'src/app/account/services/level.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { Auth } from 'src/app/shared/auth';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { StudentService } from 'src/app/student/services/student.service';
import { environment } from 'src/environments/environment';
import { AcademicSettingService } from '../../services/academic-setting.service';
import { CourseService } from '../../services/course.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Request } from 'src/app/shared/request';
import { UserProfileService } from 'src/app/user-profile/user-profile.service'



@Component({
  selector: 'app-student-register-course',
  templateUrl: './student-register-course.component.html',
  styleUrls: ['./student-register-course.component.scss']
})
export class StudentRegisterCourseComponent implements OnInit {

  $: any = $;
  doc: any = document;
  isSubmitted = false;
  availableCourses = new HashTable();
  registerCourses: any = new HashTable();
  academicSetting = new HashTable<any, any>();
  courses: any = [];
  student: any = {};
  searchData: any = {};
  levels: any = [];
  requiredHours: any = 0;
  moreHours: any = 0;
  sortType: number = 0;
  cantRegisterReason = "";
  filter: any = {};
  commission_id: any
  commissionsGet: any
  gpaWordGet: any = [{name : 'حرمان', gpa_word : 'DE'}]
  set_number: any
  maxSetNumber: any
  student_id: any;
  levelFilter: any = 0;
  groups: any =[];
  user: any;
  x: any = 0;
  //
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public isSelected = false;
  public timeoutId;
  public students: any = [];

  constructor(
    private service:UserProfileService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService,
    private studentService: StudentService,
    private courseService: CourseService,
    private studentAcountService: StudentAccountService,
    private academicSettingService: AcademicSettingService) {
    this.applicationSettingService.queueRequests();
    var self = this;
    Request.fire(false, () => {
    });


    this.student = {
      image: '/assets/img/avatar.png'
    };
    this.applicationSettingService.groups().subscribe((res: any) => {
      this.groups = res;
    })
    this.service.getProfile().subscribe((res: any) => {
      this.user = res.user.role_id;
    });
  }
  checkAll(id: any) {
    this.registerCourses.getAll().forEach((element , index) => {
      this.registerCourses.getAll()[index].group_id = id;
    })
    $('.groupFilter').val(id)
  }

  getStudentRegisterCourse() {
    this.globalService.loadHtml("affair/report20", this.student_id).subscribe((res) => {
      $('#reportContent1').html(res);
    });
  }
  ngOnInit() {
    $('#myForm input').on('change', () => {
      var t = $('input[name=radioName]:checked', '#myForm').val();
      console.log(t);
   });
    this.loadLevels();
    let self = this;
    setTimeout(() => {
      this.$('.select2').select2();
      this.$('.sort-select').change(() => {
        self.sortTable();
      });
    }, 500);

    this.loadAcademicSetting();
    this.applicationSettingService.commissions().subscribe((res) => {
      console.log(res);

      this.commissionsGet = res;
    })
    this.applicationSettingService.maxSetNumber().subscribe((res) => {
      this.maxSetNumber = res;
    })
  }

  /**
   * convert arr to hashtable
   *
   * @param arr  Array
   * @param hashtable HashTable
   */
  toHashTable(arr, hashtable: any) {
    hashtable = new HashTable<any, any>();
    arr.forEach(element => {
      hashtable.put(element.id, element);
    });
  }

  loadAvailableCourses() {
    let data = {
      student_id: this.searchData.student_id
    };
    this.courseService.getAvailableCourses(data).subscribe((res) => {
      this.toHashTable(res, this.availableCourses);
      this.courses = res;
      //
      this.loadLevels();
      //
      this.calculateRequiredHours();
      //
      this.sortTable();
    });
  }

  loadAcademicSetting() {
    this.academicSettingService.get().subscribe((res: any) => {
      //this.toHashTable(res, this.academicSetting);

      res.forEach(element => {
        this.academicSetting.put(element.id, element);
      });
      console.log(this.academicSetting);
    });
  }

  loadLevels() {

    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    console.log('this.levels')
    console.log(this.levels)
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

  loadData() {
    this.loadAvailableCourses();
    this.getMoreHours();
    this.loadRegisterCourses();
    this.isSelected = true;
  }

  calculateRequiredHours() {
    let hours = 0;
    if (this.academicSetting.getKeys().length <= 0)
      return;
    if (this.student.gpa != 0 && this.student.gpa < this.academicSetting.get(2).value) {
      this.requiredHours = this.academicSetting.get(3).value;
    } else {
      this.requiredHours = this.academicSetting.get(4).value;
    }
  }

  getMoreHours() {
    if (this.student.register_hours >= this.academicSetting.get(9).value)
      this.moreHours = this.academicSetting.get(10).value;
  }

  getAllAvailableHours() {
    return (parseFloat(this.requiredHours + "") + parseFloat(this.moreHours + ""));
  }

  getRegisterHours() {
    let hours = 0;
    this.registerCourses.getAll().forEach(element => {
      let course: any = element;
      if (!course.is_not_credit_hour)
        hours += course.credit_hour;
    });
    return hours;
  }

  validate() {
    let valid = true;
    if (this.getRegisterHours() >= this.getAllAvailableHours()) {
      Message.error("لا يمكنك تسجيل اكثرمن " + this.getAllAvailableHours());
      return false;
    }

    return true;
  }

  addCourse(course) {
   
    if(Object.keys(this.registerCourses.table).length > 10){
      return Message.error("عدي الحد المسموح من المواد");
    } else {
      if(this.student.gpa < 2 && course.level_id == 3 ){
        return Message.error("غير مسموح للطالب تسجيل مقررات من المستوي الثالث والمعدل التراكمي الخاص بة اقل من 2");
      } else {
        if (this.registerCourses.has(course.id)) {
          return Message.error("المقرر مسجل بالفعل");
        }
        if (!course.is_not_credit_hour) {
          if (!this.validate())
            return;
        }
      var check = 0;
      var array = this.student.payments;
      // for(let i = 0 ; i < array.length ; i++){
      //     if(array[i].model_object.id == 17){
      //       check = check + array[i].service_count;
      //     }
      // }
      
      // if(this.registerCourses.getAll().length < check && this.x == 0 ) {
        // alert('vvn');
        if(this.student.academic_year_expense_total_current_year >= this.student.academic_setting_payment ) {
        this.registerCourses.put(course.id, course);
      } else {
        if(this.x == 0){
          let password = prompt("يجب تسديد مبلغ الخدمة  للأستثناء ادخل الرقم السري : ");
        if (password == '556677') {
          this.x = 1;
          this.registerCourses.put(course.id, course);
        } else {
          return Message.error("الرقم السري غير صحيح");
        }
        // return Message.error("الطالب لم يسدد رسوم هذة المادة");
        } else {
          this.registerCourses.put(course.id, course);
        }

      }
      // }
      }
    }
  }

  removeCourse(course) {
    let self = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      if (self.registerCourses.has(course.id))
        self.registerCourses.remove(course.id);
    });
  }

  performUpdateRegisterCourses() {
    if(this.student.academic_year_expense_total_current_year < this.student.academic_setting_payment ) {


      Message.confirm('هذا الطالب لم يسدد المصروفات الدراسية', () => {
        console.log(this.user)
        // if(this.user != 7 && this.user != 2) {
        //   Message.error(Helper.trans('غير مسموح للتسجيل'));
        // } else{
          if(this.student.gpa < 2 && this.getRegisterHours() > 12 && this.student.academic_years_id != 9 ){
            Message.confirm('تنبية هذا الطالب المعدل التراكمي الخاص بة أقل من 2 وعدد الساعات المسجله أكثر من 12', () => {
              if (this.getRegisterHours() < this.requiredHours) {
                var self = this;
                Message.confirm(Helper.trans('student register hours less than ') + this.requiredHours, () => {
                  self.updateRegisterCourses();
                });
              } else {
                this.updateRegisterCourses()
              }
            });
          } else {
            if (this.getRegisterHours() < this.requiredHours) {
              var self = this;
              Message.confirm(Helper.trans('student register hours less than ') + this.requiredHours, () => {
                self.updateRegisterCourses();
              });
            } else {
              this.updateRegisterCourses()
            }
          }
        // }
      })

    } else {
      if(this.student.gpa < 2 && this.getRegisterHours() > 12 && this.student.academic_years_id != 9 ){
        Message.confirm('تنبية هذا الطالب المعدل التراكمي الخاص بة أقل من 2 وعدد الساعات المسجله أكثر من 12', () => {
          if (this.getRegisterHours() < this.requiredHours) {
            var self = this;
            Message.confirm(Helper.trans('student register hours less than ') + this.requiredHours, () => {
              self.updateRegisterCourses();
            });
          } else {
            this.updateRegisterCourses()
          }
        });
      } else {
        if (this.getRegisterHours() < this.requiredHours) {
          var self = this;
          Message.confirm(Helper.trans('student register hours less than ') + this.requiredHours, () => {
            self.updateRegisterCourses();
          });
        } else {
          this.updateRegisterCourses()
        }
      }
    }

  }
  putsection2(section: any , index: any , group: any , id: any , arr: any){
    $(`#courseSection${id}`).val('')
    var x = $(`#courseSection${id}`).val();
    this.putsection(x , index , group , id , arr);
  }
  putsection(section: any , index: any , group: any , id: any , arr: any){
    arr.forEach((element:any) => {
      if(element.id  == section ) {
        if(element.std_num - element.register == 0 ){
          Message.error('غير مسموح تم الأكتفاء بالعدد');
          $(`#courseSection${id}`).val('');
          this.registerCourses.getAll()[index].section_id = '';
        } else {
          this.registerCourses.getAll()[index].section_id = section;
          this.registerCourses.getAll()[index].group_id = group;
        }
      }
    });
  }
  updateRegisterCourses() {
    if (!this.student.id)
      return Message.error(Helper.trans('select student first'));
    let data = {
      courses: this.registerCourses.getAll(),
      student_id: this.student.id
    };
    this.isSubmitted = true;
    this.courseService.updateRegisterCourses(data).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.printRegisterCourses();
        this.selectStudent(this.student);
      }
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  loadRegisterCourses() {
    this.registerCourses = new HashTable();
    if (this.student.current_register_courses)
      this.student.current_register_courses.forEach(element => {
        this.registerCourses.put(element.id, element);
      });
  }

  print() {
    this.$(".title").css("width","100%");
    this.$(".title").css("text-align","center");
    this.$(".title").css("display","flex");
    this.$(".title").css("align-items","center");
    this.$(".text,.image").css("width","50%");
    Helper.print();
  }

  exportExcel() {
    const filename = Helper.trans("student register document") + "-" + new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

  printRegisterCourses() {
    let url1 = environment.publicUrl + "/academic/register-course-student-print/" + this.student.id + "?api_token=" + Auth.getApiToken();
    let url2 = environment.publicUrl + "/academic/register-course-user-print/" + this.student.id + "?api_token=" + Auth.getApiToken();
    Helper.openWindow(url1);
    Helper.openWindow(url2);
    if((this.student.gpa < 2)){
      let url3 = environment.publicUrl + "/academic/register-course-prevent-print/" + this.student.id + "?api_token=" + Auth.getApiToken();
      Helper.openWindow(url3);
    }
  }

  sortTable() {
    let sorts = this.$('.sort-select').val();
    console.log(sorts);
    let courses = this.courses;

    sorts.reverse().forEach(element => {
      if (element == 1) {
        courses = this.sortWithPrerequsites(courses);
      } else if (element == 2) {
        courses = this.sortWithRegisterTimes(courses);
      }
    });

    this.courses = courses;
    this.loadLevels();
  }

  /**
   * sort with prerequsites
   */
  sortWithPrerequsites(array) {
    let courses = [];
    let prerequistes = [];
    array.forEach(element => {
      element.sorted = false;
      prerequistes.push(element.prerequsite_length);
    });

    prerequistes.sort().reverse().forEach(element => {
      array.forEach(course => {
        if (course.prerequsite_length == element) {
          if (!course.sorted)
            courses.push(course);
          course.sorted = true;
        }
      });
    });

    return courses;
  }

  /**
   * sort with times of registers
   *
   */
  sortWithRegisterTimes(array) {
    let courses = [];
    let times = [];
    array.forEach(element => {
      element.sorted = false;
      times.push(element.times);
    });

    times.sort().reverse().forEach(element => {
      array.forEach(course => {
        if (course.times == element) {
          if (!course.sorted)
            courses.push(course);
          course.sorted = true;
        }
      });
    });

    return courses;
  }

  /**
   * check if the student can register
   *
   */
  canRegister() {
    let valid = true;

    if (this.student.case_constraint_id == 1) {
      valid = false;
      this.cantRegisterReason = Helper.trans('can register for application students');
    } else {
      this.cantRegisterReason = "";
    }

    return valid;
  }

  //***********************************************
  //*** student search methods
  //***********************************************
  //
  searchInputEvent() {
    if (!this.searchKey)
      return;

    this.students = [];
    this.studentSearchDialogLoader = true;
    this.isWait = true;
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.searchAboutStudent();
    }, 500);
  }

  searchAboutStudent() {
    this.studentAcountService.search(this.searchKey).subscribe((r) => {
      this.studentSearchDialogLoader = false;
      this.students = r;
      if (this.students.length > 0) {
        this.studentSearchDialogShow = true;
      }
    });
  }

  selectStudent(student) {
    this.x = 0;
    if (student) {
      this.searchData.student_id = student.id;
      this.searchKey = student.name;
      this.student_id = student.id;
      this.loadStudentInfo(student.id);
    }
    this.studentSearchDialogShow = false;
  }

  loadStudentInfo(id) {
    this.academicSettingService.getStudentInfo(id).subscribe((res: any) => {
      this.student = res;
      this.loadData();
    });
  }
  addSeatingNumber(id: any) {

  }
  sendNumber(id) {
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = { commission_id: this.commission_id, set_number: this.set_number };
    var _this = this;
    console.log(objectSend)
    if (this.commission_id == undefined || this.set_number == undefined || this.student_id == undefined) {
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
      $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
      return Message.error(Helper.trans('fill all required data'));
    } else {
      this.studentService.addSetNumber(id, objectSend).subscribe((res: any) => {
        if (res == 1) {
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          setTimeout(() => {
            $('#alertNumberSuccess').slideUp(1000);
            $('#closeNumber').trigger('click');
            this.commission_id = '';
            this.set_number = '';

          }, 1000);
          this.applicationSettingService.maxSetNumber().subscribe((res) => {
            this.maxSetNumber = res;
          })
          this.loadStudentInfo(id);
          return Message.success(Helper.trans('done'));
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
          $('#buttonLoading').hide();
          setTimeout(() => {
            $('#alertNumber').slideUp(1000);
          }, 1000);
          return Message.error(Helper.trans('failed'));
        }
      })
    }
  }

  printNumber(id: any) {
    this.filter.student_id = id;
    this.globalService.loadHtml("affair/report9", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
    });
    // let url1 = environment.publicUrl + "/academic/register-course-student-print/" + this.student.id + "?api_token=" + Auth.getApiToken();
    // let url2 = environment.publicUrl + "/academic/register-course-user-print/" + this.student.id + "?api_token=" + Auth.getApiToken();
    // Helper.openWindow(url1);
    // Helper.openWindow(url2);
  }
}
