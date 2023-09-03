import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { LevelService } from "src/app/account/services/level.service";
import { DivisionService } from "src/app/account/services/division.service";
import { ApplicationSettingService } from "src/app/adminision/services/application-setting.service";
import { Cache } from "src/app/shared/cache";
import { Helper } from "src/app/shared/helper";
import { Message } from "src/app/shared/message";
import { Request } from "src/app/shared/request";
import { GlobalService } from "src/app/shared/services/global.service";
import { TermService } from "src/app/account/services/term.service";
import { AcademicYearService } from "src/app/account/services/academic-year.service";
import { DegreeMapService } from "../../services/degree-map.service";
@Component({
  selector: "app-topten",
  templateUrl: "./topten.component.html",
  styleUrls: ["./topten.component.scss"],
})
export class ToptenComponent implements OnInit {
  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  terms: any = [];
  term_id: any;
  governments: any = [];
  degreeMaps: any = [];
  loading: Boolean = false;
  constructor(
    // private academicService: AcademicYearService,
    // private termService:TermService,
    private titleService: Title,
    private degreeMapService: DegreeMapService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService
  ) {
    this.titleService.setTitle("HIM" + " - " + Helper.trans("print result"));
    this.applicationSettingService.queueRequests();
    var self = this;
    Request.fire(false, () => {});
    this.degreeMapService.get().subscribe((res) => {
      this.degreeMaps = res;
    });
  }

  load() {
    if (!Helper.validator(this.filter, ["year_id"])) {
      return Message.error(Helper.trans("please choose all filters"));
    } else {
      this.loading = true;
      this.filter.count = this.filter.count || 10 
      this.filter.count = this.filter.count > 100 ? 100 : this.filter.count 
      this.globalService
        .loadHtml("academic/report25", this.filter)
        .subscribe((res) => {
          this.loading = false;
          $("#reportContent").html(res);
        });
    }
  }

  excel() {
    this.doc.exportExcel();
  }

  printContent() {
    this.doc.printJs();
  }
  ngOnInit() {
    $("#term_id").on("change", () => {
      this.term_id = $("#term_id").val();
    });

    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
  }
}
