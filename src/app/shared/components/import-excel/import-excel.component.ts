import { Component, Input, OnInit } from '@angular/core';
import { Helper } from '../../helper';
import { Message } from '../../message';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit {

  $: any = $;
  doc: any = document;
  resource: any = {};
  isSubmitted = false;
  excelRows: any = [];

  @Input() course_id: any;
  @Input() apiUrl: any;
  @Input() data: any;
  @Input() action: any;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

  loadFile(ev) {
    Helper.loadImage(ev, 'file', this.resource);
    this.readExcelFile(this.resource.file);
    console.log(this.resource);
  }

  /**
   * read excel file
   */
  readExcelFile(file) {
    var self = this;
    this.doc.readXlsxFile(file).then((rows) => {
      console.log(rows);
      self.excelRows = rows;
    })
  }


  sendFile() {
    if(this.excelRows.length == 0) return Message.error("اختار الملف اولا")
    this.isSubmitted = true;
    if(this.course_id != null){
      this.resource.course_id = this.course_id;
      this.globalService.store(this.apiUrl, Helper.toFormData(this.resource)).subscribe((res: any) => {
        if (res.status == 1) {
          Message.success(res.message);
          this.isSubmitted = false;
          if (this.action)
            this.action();
        } else {
          Message.error(res.message);
        }
        this.isSubmitted = false;
      });
    } else {
    this.globalService.store(this.apiUrl, Helper.toFormData(this.resource)).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.isSubmitted = false;
        if (this.action)
          this.action();
      } else {
        Message.error("ارفع الملف أولا");
      }
      this.isSubmitted = false;
    });
  }

  }

}
