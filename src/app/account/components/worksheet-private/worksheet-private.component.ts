import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-worksheet-private',
  templateUrl: './worksheet-private.component.html',
  styleUrls: ['./worksheet-private.component.scss']
})
export class WorksheetPrivateComponent implements OnInit {
  doc: any = document;
  constructor() { }

  ngOnInit() {
  }


  excel() {
    this.doc.exportExcel();
  }

  print() {
    this.doc.printJs();
  }

}

