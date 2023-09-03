import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exit } from 'process';
import { Auth } from 'src/app/shared/auth';
import { HashTable } from '../../../../../../node_modules/angular-hashtable';
import { AppModule } from '../../../../app.module';
import { StudentService } from '../../../services/student.service';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { Helper } from 'src/app/shared/helper';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/shared/services/global.service';
@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss']
})
export class StudentIndexComponent implements OnInit {

  public doc: any = document;
  public $: any = $;

  // Resources list
  public resources: any = {};

  // init breadcrum
  public breadcrumbList = [];
  public search: any = {};

  // remove options
  public showRemoveButton = false;
  public showRemoveModal = false;
  public trashList = new HashTable<any, any>();
  public removed = [];

  public levels: any = [];

  public applicationSettings = ApplicationSettingService;

  // app


  public pages: any;
  public isLoad = false;

  public selectedItem: any= {};

  public col = "col-lg-12 col-md-12 col-sm-12 col-xs-12";


  constructor(public studentService: StudentService ,private globalService: GlobalService, public router: ActivatedRoute, private toaster: ToastrService) {
    // init breadcrum
    !Auth.can('student_read')? exit() : '';
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: 'students'}
    ];

    this.router.queryParams.subscribe((params) => {
      let col = params['col'];
      console.log(col);
      //if (col)
      //  this.col = col;
    });
  //  this.dated = this.datePipe.transform(this.dated, 'yyyy-MM-dd');
   // this.dated2 = this.datePipe.transform(this.dated2, 'yyyy-MM-dd');
   this.localCompleteDate = new Date();
   this.localCompleteDate2 = new Date();

   this.dated = this.localCompleteDate.toISOString();
   this.dated = this.dated.substring(0, this.dated.length - 1);
   this.dated2 = this.localCompleteDate2.toISOString();
   this.dated2 = this.dated2.substring(0, this.dated2.length - 1);

  }
  notVailed=false;
  localCompleteDate ;
  localCompleteDate2 ;


  toggleFromTrash(id) {
    if (this.trashList.has(id)) {
      this.trashList.remove(id);
    }
    else {
      this.trashList.put(id, id);
    }

    if (this.trashList.size() > 0)
      this.showRemoveButton = true;
    else
      this.showRemoveButton = false;
  }

  removeResources() {
    this.showRemoveModal = true;
    const queue = this.trashList.getKeys();
    if (queue.length > 0) {
      const id = queue.pop();
      this.studentService.destroy(id).subscribe(()=> {
        this.removed.push(id);
        this.trashList.remove(id);
        //
        this.removeResources();
      });
    } else {
      this.removed = [];
      this.showRemoveButton = false;
      this.showRemoveModal = false;
      this.loadResources();
    }
  }

  prePagniation() {
    if (!this.resources.data)
      return;
    this.resources.prev_page = this.resources.prev_page_url? this.resources.prev_page_url.replace(this.resources.path+'?page=', '') : null;
    this.resources.next_page = this.resources.next_page_url? this.resources.next_page_url.replace(this.resources.path+'?page=', '') : null;
    this.resources.pages = Math.ceil(this.resources.total / this.resources.per_page);
    this.resources.pages_arr = [];
    for(let i = 0; i < this.resources.pages; i ++)
      this.resources.pages_arr.push(i+1);
  }



  loadResources(page=1) {
    this.isLoad = true;
    this.studentService.get(page, this.search).subscribe( (res: any) => {
      console.log(res);

      this.resources = res;
      this.prePagniation();
      this.isLoad = false;
    });
  }

  setStudentContainerHeight() {
    //const height = window.innerHeight - 90;
    //this.doc.jquery('.student-container').css('height', height);
  }
  corona(id: any) {
    if ($(`#customSwitch${id}`).is(':checked')) {
      const formdata = new FormData;
      formdata.append('id' , id)
      formdata.append('isCorona' , '1')
      this.studentService.update(formdata).subscribe((res)=>{});
    } else{
      const formdata = new FormData;
      formdata.append('id' , id)
      formdata.append('isCorona' , '0')
      this.studentService.update(formdata).subscribe((res)=>{});
    }
  }

  ngOnInit() {
    this.setStudentContainerHeight();
    this.loadResources();

    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

  showStudentPayments(item: any) {
    this.selectedItem = item;
    this.doc.jquery('#studentPayments').modal('show');
  }
  display= 'none';
  display2= 'none';
  display3= 'none';
  display5= 'none';

  pass="556677"
  valepa
  onCloseModal() {
    this.display = 'none';
  }
  paid_value=0
  StudData
  resStudData1
  coursees2=[]
  numberLimit2
  arrayCourse=[]
  openModel(item){
    this.idsmat2=[]
    this.idsmat=[]
    this.namecourse2=[]
    this.namecourse=[]

    this.notVailed=false

    this.StudData=item;
    this.ShowStudentrecords()

    this.numberLimit2=0;
  this.numberLimit=0;
  this.counter2=1;
  this.totalpay2 = 0
  this.totalbook2 =0
  this.totalBook_Mat2=0
  this.totalpay=0;
  this.totalbook =0;
   this.totalBook_Mat==0;

    if(item.paid_value ==0){
      this.studentService.getSummer(this.StudData.id,this.StudData.level_id ,this.StudData.division_id).subscribe( (res: any) => {

        console.log("ddddddddddddddddddddd"+res);

        this.resStudData1 = res;
        this.coursees2=res["Course"]

        this.numberLimit2=res["numberSubject"]



      });
      this.totalpay=0;
      this.totalbook=0
      this.totalBook_Mat=0
      this.display5 = 'block';

    }else{
      this.paid_value=item.paid_value
      this.display = 'block';

    }

  }
  openNextModel(){
    this.display = 'none';

    this.display2= 'block';
this.valepa=""
  }
  resStudData
  coursees:any[]=[]
  numberLimit
  openNextMode2(){
    this.counter=1;
    this.numberLimit2=0;
    this.numberLimit=0;
    this.totalpay2 = 0
    this.totalbook2 =0
    this.totalBook_Mat2=0
    this.totalpay=0;
    this.totalbook =0;
     this.totalBook_Mat==0;
    this.notVailed=false;
    if(this.pass==this.valepa){
      this.display2 = 'none';

      this.display3= 'block';


        this.studentService.getSummer(this.StudData.id,this.StudData.level_id ,this.StudData.division_id).subscribe( (res: any) => {
          console.log(res);

          this.resStudData = res;
          this.coursees=res["Course"]
          console.log( this.coursees)
          this.numberLimit=res["numberSubject"]



        });


    }else{
      this.toaster.error("الرقم السرى غير صحيح")
      this.notVailed=true
    }
    this.note2=""
    this.totalpay2=0
    this.totalbook2=0
    this.totalBook_Mat2=0
    this.idsmat2=[];
    this.dated=null

  }
  onCloseModal2(){
    this.display2 = 'none';

  }
  onCloseModal3(){
    this.display3 = 'none';

  }
  display4 = 'none';
  onCloseModal4(){
    this.display4 = 'none';

  } onCloseModal5(){
    this.display5 = 'none';

  }
  file
  chooseFile(files:any) {

this.file=files[0];
    if ( files[0].size >5000 * 1024) {
      //this.warnning=true;
      //this.form?.get('file')?.setValue(null)

    }
    else   {
      //this.warnning=false;
     // debugger

     // this.form?.get('file')?.setValue(files[0])
    }
  }
  counter=1
  priceMatrial2
  namecourse=[]
  namecourse2=[]

  change(event, cor ) {
    this.studentService.getCoursePrice(cor.level_id).subscribe( (res: any) => {
      this.priceMatrial2= res;



      if(event.target.checked === true){
        if(this.counter <= this.numberLimit){

          this.totalpay2 +=this.priceMatrial2.price_material
          this.totalbook2 +=this.priceMatrial2.book_price
          this.totalBook_Mat2=this.totalpay2+ this.totalbook2
          this.idsmat2.push(cor.id);
          this.namecourse.push(cor.name)


      }else{
         event.target.checked = false;
         this.display4 = 'block';
        this.valepa2=""
      }
      }else{
        if(this.counter>0){

          this.counter--;
          this.totalpay2-=this.priceMatrial2.price_material
          this.totalbook2 -=this.priceMatrial2.book_price
          this.totalBook_Mat2=this.totalpay2+ this.totalbook2
          let index = this.idsmat2.findIndex((element) => element  == cor.id);

          this.idsmat2.splice(index, 1);
          // let index2 = this.namecourse.find((element) => element  === cor.name);
          // this.namecourse.splice(index2, 1);
          this.namecourse.forEach((value,index)=>{
            if(value== cor.name) this.namecourse.splice(index,1);
        });


        }


      }

    });
}
counter2=1
priceMatrial
totalbook=0
totalBook_Mat=0
idsmat=[];
change2(event, cor ) {
  this.studentService.getCoursePrice(cor.level_id).subscribe( (res: any) => {
    this.priceMatrial= res;


  if(event.target.checked === true){
    if(this.counter2 <= this.numberLimit2){
    this.counter2++
       this.totalpay +=this.priceMatrial.price_material
      this.totalbook +=this.priceMatrial.book_price
      this.totalBook_Mat=this.totalpay+ this.totalbook
      this.idsmat.push(cor.id)
      this.namecourse2.push(cor.name)


     console.log("sss"+this.totalpay)
  }else{
     event.target.checked = false;
     this.display4 = 'block';
 this.valepa2=""
  }
  }
  else{
    if(this.counter2>0){

      debugger
      this.counter2--;
      this.totalpay-=this.priceMatrial.price_material
      this.totalbook -=this.priceMatrial.book_price
      this.totalBook_Mat=this.totalpay+ this.totalbook
      let index = this.idsmat.findIndex((element) => element  == cor.id);

      this.idsmat.splice(index, 1);
      // let index2 = this.namecourse2.find((element) => element  === cor.name);
      // this.namecourse2.splice(index2, 1);
      this.namecourse2.forEach((value,index)=>{
        if(value== cor.name) this.namecourse2.splice(index,1);
    });

    }else if (this.counter==0){
      this.totalpay-=0
      this.totalbook -=0
      this.totalBook_Mat=0
      this.idsmat=null
      this.namecourse2=null
    }

  }


  });
}
expression=false;
pass2="12345"
valepa2
onOpenModel5(){
  this.notVailed=false
  if(this.pass2==this.valepa2){
    this.display4 = 'none';
    this.numberLimit2=3;
    this.numberLimit=3;
  }else{
    this.notVailed=true
    this.toaster.show("كلمه السر غير صحيحه")
  }


}
totalpay=0
totalbook2=0
totalBook_Mat2=0
idsmat2=[];
dated
submitData(){
  let formData={}
  formData={
        "student_id": this.StudData.id,
        "total_price":this.totalpay + this.totalbook,
        "material_price":this.totalpay,
        "book_price":this.totalbook,
        "course_id":this.idsmat,
        "date":this.dated
        }

  this.globalService.store('academic/summer/courses/register',formData).subscribe( (res: any) => {
    console.log(res);
    this.display5='none'
      this.ShowStudentrecords()

    this.print2()
  });
// if(this.idsmat.length>=3&& this.numberLimit2<=2){
//     formData={
//     "level_id": this.StudData.level_id,
//     "academic_year_id":this.StudData.academic_years_id,
//     "total_price_material":this.totalpay,
//     "total_price_book":this.totalbook,
//     "sub1_id":this.idsmat[0],
//     "sub2_id":this.idsmat[1],
//     "sub3_id":this.idsmat[2],
//     "with_premission":1,
//     "date":this.dated

//     }

// }
// else if(this.idsmat.length>=3&& this.numberLimit2>3){
//   formData={
//   "level_id": this.StudData.level_id,
//   "academic_year_id":this.StudData.academic_years_id,
//   "total_price_material":this.totalpay,
//   "total_price_book":this.totalbook,
//   "sub1_id":this.idsmat[0],
//   "sub2_id":this.idsmat[1],
//   "sub3_id":this.idsmat[2],
//   "with_premission":1,
//   "date":this.dated

//   }

// }
// else{
//   if(this.idsmat.length==1){
//     formData={
//       "level_id": this.StudData.level_id,
//     "academic_year_id":this.StudData.academic_years_id,
//     "total_price_material":this.totalpay,
//     "total_price_book":this.totalbook,
//     "sub1_id":this.idsmat[0],
//     "sub2_id":"",
//     "sub3_id":"",
//     "date":this.dated
//   }
//   }else{
//     formData={
//       "level_id": this.StudData.level_id,
//     "academic_year_id":this.StudData.academic_years_id,
//     "total_price_material":this.totalpay,
//     "total_price_book":this.totalbook,
//     "sub1_id":this.idsmat[0],
//     "sub2_id":this.idsmat[2],
//     "sub3_id":"",
//     "date":this.dated
//   }
//   }


//  }


 }
 totalpay2=0

dated2
note2
submitData2(){
  let formData={}
 let fo=new FormData()
 console.log(this.file)
 fo.append('attachment',this.file)
 fo.append('student_id', this.StudData.id)
 fo.append('total_price',(this.totalpay2 +this.totalbook2).toString())
 fo.append('material_price',this.totalpay2.toString())
 fo.append('book_price',this.totalbook2.toString())
 for (let i=0;i<this.idsmat2.length;i++) {
  fo.append(`course_id[${i}]`,this.idsmat2[i].toString())
}
 fo.append('date',this.dated2)
 fo.append('date',this.dated2)
 fo.append('notes',this.note2)

  // formData={
  //       "student_id": this.StudData.level_id,
  //       "total_price":this.totalpay2 +this.totalbook2,
  //       "material_price":this.totalpay2,
  //       "book_price":this.totalbook2,
  //       "course_id":this.idsmat2,

  //       "date":this.dated2,
  //       "notes":this.note2,
  //       "attachment": fo.append('attachment',this.file)

  //       }
        this.globalService.store('academic/summer/courses/register',fo).subscribe( (res: any) => {
    console.log(res);
    this.display3='none'
    this.ShowStudentrecords()

    this.print3()

  });
// if(this.idsmat2.length>=3&& this.numberLimit2<=2){
//     formData={
//     "level_id": this.StudData.level_id,
//     "academic_year_id":this.StudData.academic_years_id,
//     "total_price_material":this.totalpay2,
//     "total_price_book":this.totalbook2,
//     "sub1_id":this.idsmat2[0],
//     "sub2_id":this.idsmat2[1],
//     "sub3_id":this.idsmat2[2],
//     "with_premission":3,
//     "date":this.dated2.toDateString(),
//     "note":this.note2

//     }

// }
// else if(this.idsmat2.length>=3&& this.numberLimit2>3){

//   formData={
//   "level_id": this.StudData.level_id,
//   "academic_year_id":this.StudData.academic_years_id,
//   "total_price_material":this.totalpay2,
//   "total_price_book":this.totalbook2,
//   "sub1_id":this.idsmat2[0],
//   "sub2_id":this.idsmat2[1],
//   "sub3_id":this.idsmat2[2],
//   "with_premission":3,
//   "date":this.dated2,
//   "note":this.note2

//   }

// }
// else{
//   if(this.idsmat2.length==1){
//     formData={
//       "level_id": this.StudData.level_id,
//     "academic_year_id":this.StudData.academic_years_id,
//     "total_price_material":this.totalpay2,
//     "total_price_book":this.totalbook2,
//     "sub1_id":this.idsmat2[0],
//     "sub2_id":"",
//     "sub3_id":"",
//     "date":this.dated2,
//     "note":this.note2,
//     "with_premission":2,


//     }}
//     else{
//       formData={
//         "level_id": this.StudData.level_id,
//       "academic_year_id":this.StudData.academic_years_id,
//       "total_price_material":this.totalpay2,
//       "total_price_book":this.totalbook2,
//       "sub1_id":this.idsmat2[0],
//       "sub2_id":this.idsmat2[1],
//       "sub3_id":"",
//       "date":this.dated2,
//       "note":this.note2,
//       "with_premission":2,


//     }
//   }


//  }



 }
 expression2=false

print2(){
  debugger
  let popupWin = window.open('', '_blank', 'width=1080,height=595');
  popupWin.document.open();
  let printContents = document.body.innerHTML;
  let printHead = document.head.innerHTML;
  if ((this.namecourse2[2]==null ||this.namecourse2[2]==undefined)&&(this.namecourse2[1]!=null ||this.namecourse2[1]!=undefined)){

    popupWin.document
    .write(`<html>
       ${printHead}
      <body onload="window.print();" >
      <section style="padding:15px;border:2px solid black; border-radius:10px; height:100vh" >
      <div style='display:flex;justify-content:space-between'>
      <img style="width:100px" src="http://him-ma.site/logo.png">
      <h5 style="text-align: center;">المعهد العالى للادارة
      <br>
      بالمحلة الكبرى
      </h5>

      </div>
      <div style="margin-top:10px;text-align: center;margin-bottom:10px">


      <h5> الطالب :
      ${this.StudData.name}
      </h5>
      </div>
      <div>
      <hr>
      <h5>
      المواد  :

      </h5>
      <div style="margin-top:20px;margin-bottom:20px">
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse2[0]}
      </h6>
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse2[1]}
      </h6></div>

  </div>
  </div>
  </section>
      </body></html>`);
  }
  else if  ((this.namecourse2[2]==null ||this.namecourse2[2]==undefined)&&(this.namecourse2[1]==null ||this.namecourse2[1]==undefined)){

    popupWin.document
    .write(`<html>
       ${printHead}
      <body onload="window.print();" >
      <section style="padding:15px;border:2px solid black; border-radius:10px; height:100vh" >
      <div style='display:flex;justify-content:space-between'>
      <img style="width:100px" src="http://him-ma.site/logo.png">
      <h5 style="text-align: center;">المعهد العالى للادارة
      <br>
      بالمحلة الكبرى
      </h5>

      </div>
      <div style="margin-top:10px;text-align: center;margin-bottom:10px">


      <h5> الطالب :
      ${this.StudData.name}
      </h5>
      </div>
      <div>
      <hr>
      <h5>
      المواد  :

      </h5>
      <div style="margin-top:20px;margin-bottom:20px">
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse2[0]}
      </h6>
     </div>

  </div>
  </div>
  </section>
      </body></html>`);
  }
  else{
    popupWin.document
    .write(`<html>
       ${printHead}
      <body onload="window.print();" >
      <section style="padding:15px;border:2px solid black; border-radius:10px; height:100vh" >
      <div style='display:flex;justify-content:space-between'>
      <img style="width:100px" src="http://him-ma.site/logo.png">
      <h5 style="text-align: center;">المعهد العالى للادارة
      <br>
      بالمحلة الكبرى
      </h5>

      </div>
      <div style="margin-top:10px;text-align: center;margin-bottom:10px">


      <h5> الطالب :
      ${this.StudData.name}
      </h5>
      </div>
      <div>
      <hr>
      <h5>
      المواد  :

      </h5>
      <div style="margin-top:20px;margin-bottom:20px">
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse2[0]}
      </h6>
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse2[1]}
      </h6>
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse2[2]}
      </h6>
      </div>

  </div>
  </section>
      </body></html>`);
  }


  popupWin.document.close();}

  print3(){

    let popupWin = window.open('', '_blank', 'width=1080,height=595');
    popupWin.document.open();
    let printContents = document.body.innerHTML;
    let printHead = document.head.innerHTML;
    if ((this.namecourse[2]==null ||this.namecourse[2]==undefined)&&(this.namecourse[1]!=null ||this.namecourse[1]!=undefined)){
      popupWin.document
      .write(`<html>
         ${printHead}
        <body onload="window.print();" >
        <section style="padding:15px;border:2px solid black; border-radius:10px; height:100vh" >
        <div style='display:flex;justify-content:space-between'>
        <img style="width:100px" src="http://him-ma.site/logo.png">
        <h5 style="text-align: center;">المعهد العالى للادارة
        <br>
        بالمحلة الكبرى
        </h5>

        </div>
        <div style="margin-top:10px;text-align: center;margin-bottom:10px">


        <h5> الطالب :
        ${this.StudData.name}
        </h5>
        </div>
        <div>
        <hr>
        <h5>
        المواد  :

        </h5>
        <div style="margin-top:20px;margin-bottom:20px">
        <h6 style="margin-top:20px;margin-bottom:20px">
        ${this.namecourse[0]}
        </h6>
        <h6 style="margin-top:20px;margin-bottom:20px">
        ${this.namecourse[1]}
        </h6></div>

    </div>
    </section>
        </body></html>`);
    }
   else if ((this.namecourse[2]==null ||this.namecourse[2]==undefined)&&(this.namecourse[1]==null ||this.namecourse[1]==undefined)){
      popupWin.document
      .write(`<html>
         ${printHead}
        <body onload="window.print();" >
        <section style="padding:15px;border:2px solid black; border-radius:10px; height:100vh" >
        <div style='display:flex;justify-content:space-between'>
        <img style="width:100px" src="http://him-ma.site/logo.png">
        <h5 style="text-align: center;">المعهد العالى للادارة
        <br>
        بالمحلة الكبرى
        </h5>

        </div>
        <div style="margin-top:10px;text-align: center;margin-bottom:10px">


        <h5> الطالب :
        ${this.StudData.name}
        </h5>
        </div>
        <div>
        <hr>
        <h5>
        المواد  :

        </h5>
        <div style="margin-top:20px;margin-bottom:20px">
        <h6 style="margin-top:20px;margin-bottom:20px">
        ${this.namecourse[0]}
        </h6>
         </div>

    </div>
    </section>
        </body></html>`);
    }
    else{
      popupWin.document
    .write(`<html>
       ${printHead}
      <body onload="window.print();" >
      <section style="padding:15px;border:2px solid black; border-radius:10px; height:100vh" >
      <div style='display:flex;justify-content:space-between'>
      <img style="width:100px" src="http://him-ma.site/logo.png">
      <h5 style="text-align: center;">المعهد العالى للادارة
      <br>
      بالمحلة الكبرى
      </h5>

      </div>
      <div style="margin-top:10px;text-align: center;margin-bottom:10px">


      <h5> الطالب :
      ${this.StudData.name}
      </h5>
      </div>
      <div>
      <hr>
      <h5>
      المواد  :

      </h5>
      <div style="margin-top:20px;margin-bottom:20px">
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse[0]}
      </h6>
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse[1]}
      </h6>
      <h6 style="margin-top:20px;margin-bottom:20px">
      ${this.namecourse[2]}
      </h6>
      </div>

  </div>
  </section>
      </body></html>`);
    }

    popupWin.document.close();}

    studentHistory:any=[]
    ShowStudentrecords(){
      this.studentHistory=null
      let formData={
        "student_id":this.StudData.id
      }
      this.globalService.get('academic/summer/courses/get',formData).subscribe( (res: any) => {

        this.studentHistory=res
      });
    }

  //   public static viewReceipt(paymentId) {
  //     const options = "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=905,height=484";
  //     const data = {
  //         api_token: Auth.getApiToken(),
  //         payment_id: paymentId
  //     };
  //     const url = environment.apiUrl + "/account/payment_receipt?" + AppModule.doc.jquery.param(data);
  //     window.open(url, "_blank", options);
  // }
}
