import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../shared/auth';
import { AppModule } from '../../../app.module';
import { ApplicationRequiredService } from '../../services/application-required.service';
import { Message } from '../../../shared/message';
import { exit } from 'process';

@Component({
  selector: 'app-application-required',
  templateUrl: './application-required.component.html',
  styleUrls: ['./application-required.component.scss']
})
export class ApplicationRequiredComponent implements OnInit {

  public doc = AppModule.doc;
  public resources: any = {};
  public isSubmitted = false;
  public breadcrumbList: any;

  constructor(private applicationRequiredService: ApplicationRequiredService) {
    !Auth.can('application_required')? exit() : '';
    // init breadcrum
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: 'application_required'}
    ];
  }

  ngOnInit() {
    this.loadResources();
  }

  loadResources() {
    this.applicationRequiredService.get().subscribe((res) => {
      this.resources = res;
    });
  }

  updateResources() {
    this.isSubmitted = true;
    const data = {
      data: this.resources
    };
    this.applicationRequiredService.update(data).subscribe((res) => {
      const data: any = res;
      if (data.status == 1) {
        Message.success(data.message);
        this.loadResources();
      }
      else
        Message.error(data.message);

      this.isSubmitted = false;
    });
  }


  check(bool) {
    this.resources.forEach(element => {
      element.required = bool;
    });
  }
}
