import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {
  public $: any = $;
  public doc: any = document;
  constructor() { }

  ngOnInit() {
    var self = this;
    setTimeout(() => {
      let height = window.innerHeight - 60;
      self.$('.student-affair-container').css('height', height+"px");
      //
      console.log(height);
    }, 500);
  }

}
