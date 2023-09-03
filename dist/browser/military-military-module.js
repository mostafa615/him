(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["military-military-module"],{

/***/ "./src/app/military/components/military-area/military-area.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/military/components/military-area/military-area.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w3-block w3-row\">\r\n  <div class=\"w3-white material-shadow safe-box col-lg-6 col-md-6 col-sm-6\">\r\n    <div class=\"safe-box-header w3-large\" style=\"padding: 5px!important\">\r\n      {{ \"military_areas\" | trans }}\r\n    </div>\r\n    <div class=\"border-bottom-dashed\"></div>\r\n    <br>\r\n\r\n    <div class=\"row\">\r\n\r\n      <div class=\"col-lg-12\">\r\n        <div class=\"custom-panel w3-display-container w3-round application-panel student-info-panel\">\r\n\r\n          <div class=\"custom-panel-body table-responsive w3-padding w3-center\" style=\"height: 400px;\" >\r\n            <table class=\" table-bordered\" >\r\n              <thead>\r\n                <th>#</th>\r\n                <th>{{ \"name\" | trans }}</th>\r\n                <th>{{ \"government\" | trans }}</th> \r\n                <th></th>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let item of data index as i\" >\r\n                  <td>{{ i + 1 }}</td> \r\n                  <td>\r\n                    <input type=\"text\" class=\"form-control input-sm\" [(ngModel)]=\"item.name\" >\r\n                  </td>\r\n                    <td>\r\n                      <select class=\"form-control input-sm\" [(ngModel)]=\"item.government_id\"  >\r\n                        <option *ngFor=\"let gover of govers\" value=\"{{ gover.id }}\">{{ gover.name }}</option>\r\n                      </select>\r\n                    </td>\r\n                  <td>\r\n                    <button class=\"btn btn-success\"\r\n                    [disabled]=\"isSubmitted\"\r\n                    (click)=\"send(item, i)\" >\r\n                    <i *ngIf=\"!isSubmitted\" class=\"fa fa-check\" ></i>\r\n                    <i *ngIf=\"isSubmitted\" class=\"fa fa-spin fa-spinner\" ></i>\r\n                  </button>\r\n                    <button class=\"btn btn-danger\"\r\n                    [disabled]=\"isSubmitted\"\r\n                    (click)=\"destroy(item, i)\" >\r\n                      <i *ngIf=\"!isSubmitted\" class=\"fa fa-trash\" ></i>\r\n                      <i *ngIf=\"isSubmitted\" class=\"fa fa-spin fa-spinner\" ></i>\r\n                    </button>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                  <td></td>\r\n                  <td>\r\n                    <button class=\"fa fa-plus w3-block btn btn-default btn-flat\" (click)=\"add()\" ></button>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/military/components/military-area/military-area.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/military/components/military-area/military-area.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21pbGl0YXJ5L2NvbXBvbmVudHMvbWlsaXRhcnktYXJlYS9taWxpdGFyeS1hcmVhLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/military/components/military-area/military-area.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/military/components/military-area/military-area.component.ts ***!
  \******************************************************************************/
/*! exports provided: MilitaryAreaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilitaryAreaComponent", function() { return MilitaryAreaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_settings_setting_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/settings/setting-template */ "./src/app/settings/setting-template.ts");
/* harmony import */ var src_app_settings_services_setting_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/settings/services/setting.service */ "./src/app/settings/services/setting.service.ts");
/* harmony import */ var src_app_adminision_services_application_setting_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/adminision/services/application-setting.service */ "./src/app/adminision/services/application-setting.service.ts");





var MilitaryAreaComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MilitaryAreaComponent, _super);
    function MilitaryAreaComponent(settingService, applicationSettingService) {
        var _this = _super.call(this, settingService) || this;
        _this.settingService = settingService;
        _this.applicationSettingService = applicationSettingService;
        _this.govers = [];
        _this.baseUrl = "military_areas";
        _this.requiredFields = ['name', 'government_id'];
        _this.get();
        return _this;
    }
    MilitaryAreaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.applicationSettingService.getGovernments().subscribe(function (res) {
            _this.govers = res;
        });
    };
    MilitaryAreaComponent.prototype.action = function () {
        this.get();
    };
    MilitaryAreaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-military-area',
            template: __webpack_require__(/*! ./military-area.component.html */ "./src/app/military/components/military-area/military-area.component.html"),
            styles: [__webpack_require__(/*! ./military-area.component.scss */ "./src/app/military/components/military-area/military-area.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_settings_services_setting_service__WEBPACK_IMPORTED_MODULE_3__["SettingService"], src_app_adminision_services_application_setting_service__WEBPACK_IMPORTED_MODULE_4__["ApplicationSettingService"]])
    ], MilitaryAreaComponent);
    return MilitaryAreaComponent;
}(src_app_settings_setting_template__WEBPACK_IMPORTED_MODULE_2__["SettingTemplate"]));



/***/ }),

/***/ "./src/app/military/components/military-status/military-status.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/military/components/military-status/military-status.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w3-block w3-row\">\r\n  <div class=\"w3-white material-shadow safe-box col-lg-6 col-md-6 col-sm-6\">\r\n    <div class=\"safe-box-header w3-large text-center\" style=\"padding: 5px!important\">\r\n      {{ \"military_status\" | trans }}\r\n    </div>\r\n    <div class=\"border-bottom-dashed\"></div>\r\n    <br>\r\n\r\n    <div class=\"row\">\r\n\r\n      <div class=\"col-lg-12\">\r\n        <div class=\"custom-panel w3-display-container w3-round application-panel student-info-panel\">\r\n          <div class=\"custom-panel-body table-responsive w3-padding w3-center\" style=\"height: 400px;\" >\r\n            <table class=\" table-bordered\" >\r\n              <thead>\r\n                <th>#</th>\r\n                <th>{{ \"name\" | trans }}</th>\r\n                <th></th>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let item of data index as i\" >\r\n                  <td>{{ i + 1 }}</td>\r\n                  <td>\r\n                    <input type=\"text\" class=\"form-control input-sm\" [(ngModel)]=\"item.name\" >\r\n                  </td>\r\n                  <td>\r\n                    <button class=\"btn btn-success\"\r\n                    [disabled]=\"isSubmitted\"\r\n                    (click)=\"send(item, i)\" >\r\n                    <i *ngIf=\"!isSubmitted\" class=\"fa fa-check\" ></i>\r\n                    <i *ngIf=\"isSubmitted\" class=\"fa fa-spin fa-spinner\" ></i>\r\n                  </button>\r\n                    <button class=\"btn btn-danger\"\r\n                    [disabled]=\"isSubmitted\"\r\n                    (click)=\"destroy(item, i)\" >\r\n                      <i *ngIf=\"!isSubmitted\" class=\"fa fa-trash\" ></i>\r\n                      <i *ngIf=\"isSubmitted\" class=\"fa fa-spin fa-spinner\" ></i>\r\n                    </button>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                  <td></td>\r\n                  <td>\r\n                    <button class=\"fa fa-plus w3-block btn btn-default btn-flat\" (click)=\"add()\" ></button>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/military/components/military-status/military-status.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/military/components/military-status/military-status.component.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21pbGl0YXJ5L2NvbXBvbmVudHMvbWlsaXRhcnktc3RhdHVzL21pbGl0YXJ5LXN0YXR1cy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/military/components/military-status/military-status.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/military/components/military-status/military-status.component.ts ***!
  \**********************************************************************************/
/*! exports provided: MilitaryStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilitaryStatusComponent", function() { return MilitaryStatusComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_settings_services_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/settings/services/setting.service */ "./src/app/settings/services/setting.service.ts");
/* harmony import */ var src_app_settings_setting_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/settings/setting-template */ "./src/app/settings/setting-template.ts");




var MilitaryStatusComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MilitaryStatusComponent, _super);
    function MilitaryStatusComponent(settingService) {
        var _this = _super.call(this, settingService) || this;
        _this.settingService = settingService;
        _this.baseUrl = "military_status";
        _this.requiredFields = ['name'];
        _this.get();
        return _this;
    }
    MilitaryStatusComponent.prototype.ngOnInit = function () {
    };
    MilitaryStatusComponent.prototype.action = function () {
        this.get();
    };
    MilitaryStatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-military-status',
            template: __webpack_require__(/*! ./military-status.component.html */ "./src/app/military/components/military-status/military-status.component.html"),
            styles: [__webpack_require__(/*! ./military-status.component.scss */ "./src/app/military/components/military-status/military-status.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_settings_services_setting_service__WEBPACK_IMPORTED_MODULE_2__["SettingService"]])
    ], MilitaryStatusComponent);
    return MilitaryStatusComponent;
}(src_app_settings_setting_template__WEBPACK_IMPORTED_MODULE_3__["SettingTemplate"]));



/***/ }),

/***/ "./src/app/military/components/student-age/student-age.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/military/components/student-age/student-age.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"custom-panel w3-display-container w3-round application-panel student-info-panel\">\n    <div class=\"custom-panel-body table-responsive w3-padding\">\n        <button mat-raised-button color=\"primary\" class=\"mat-raised-button mat-primary\" [disabled]=\"isSubmitted\" (click)=\"updateDate()\" style=\"margin: 5px\">\n<i *ngIf=\"isSubmitted\" class=\"fa fa-spin fa-spinner\"></i>\n<span *ngIf=\"!isSubmitted\">{{ \"update\" | trans }} </span>\n   </button>\n        <button mat-raised-button color=\"primary\" class=\"w3-margin-left w3-black\" (click)=\"print()\"> <i class=\"fa fa-print\" ></i> {{ \"print\" | trans }}</button>\n        <button mat-raised-button color=\"primary\" class=\"w3-margin-left w3-green\" (click)=\"exportExcel()\"> <i class=\"fa fa-file-excel-o\" ></i> {{ \"excel\" | trans }}</button>\n\n        <!-- <button mat-raised-button color=\"primary\" class=\"w3-margin-left w3-black\" (click)=\"print()\"> <i class=\"fa fa-print\" ></i> {{ \"print\" | trans }}</button> -->\n\n        <!-- <button mat-raised-button color=\"primary\" class=\"w3-margin-left w3-green\" (click)=\"exportExcel()\"> <i class=\"fa fa-file-excel-o\" ></i> {{ \"excel\" | trans }}</button> -->\n\n        <!-- <button permission=\"result_transfer\" mat-raised-button color=\"primary\" class=\"w3-margin-left w3-red\" routerLink=\"/academic/result-transfer\"> <i class=\"fa fa-send-o\" ></i> {{ \"result_transfer\" | trans }}</button> -->\n\n    </div>\n</div>\n<div class=\"custom-panel w3-display-container w3-round application-panel student-info-panel\" style=\"height:455px;overflow: auto;margin-left: 78px !important;\">\n    <div class=\"custom-panel-body table-responsive w3-padding\" id=\"printable\">\n        <table class=\"table\" id=\"tablePrint\">\n            <tr>\n                <th scope=\"col\">كود الطالب</th>\n\n                <th scope=\"col\">الاسم</th>\n                <th scope=\"col\">رقم التليفون</th>\n                <th scope=\"col\"> الرقم القومى</th>\n\n                <th scope=\"col\">المستوى</th>\n                <th scope=\"col\">التخصص</th>\n\n                <th scope=\"col\">السن</th>\n\n\n            </tr>\n            <tr *ngFor=\"let res of responses \">\n                <td> {{res.code}}</td>\n\n                <td> {{res.name}}</td>\n                <td> {{res.phone_1}}</td>\n                <td> {{res.national_id}}</td>\n\n                <td> {{res.level_name}}</td>\n                <td> {{res.division_name}}</td>\n\n                <td *ngIf=\"res.age>=24\" style=\"background-color:red\"> {{res.age}}</td>\n                <td *ngIf=\"res.age< 24\"> {{res.age}}</td>\n\n            </tr>\n        </table>\n    </div>\n</div>\n<!-- <div class=\"row mt-5\">\n    <div class=\"col-12\">\n        <nav aria-label=\"Page navigation \" style=\"display: flex;\">\n            <pagination-controls style=\"margin: auto;\" previousLabel=\"السابق\" nextLabel=\"التالى\" (pageChange)=\"onPageChange($event)\">\n            </pagination-controls>\n        </nav>\n    </div>\n</div> -->\n"

/***/ }),

/***/ "./src/app/military/components/student-age/student-age.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/military/components/student-age/student-age.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  background-color: white;\n  padding: 50px;\n  width: 100%; }\n\n.table > tbody > tr > td,\n.table > tbody > tr > th,\n.table > tfoot > tr > td,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > thead > tr > th {\n  padding: 9px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWlsaXRhcnkvY29tcG9uZW50cy9zdHVkZW50LWFnZS9EOlxcaGltRnJvbnRFbmQvc3JjXFxhcHBcXG1pbGl0YXJ5XFxjb21wb25lbnRzXFxzdHVkZW50LWFnZVxcc3R1ZGVudC1hZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLFdBQVcsRUFBQTs7QUFHZjs7Ozs7O0VBTUksdUJBQXNCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9taWxpdGFyeS9jb21wb25lbnRzL3N0dWRlbnQtYWdlL3N0dWRlbnQtYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiA1MHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi50YWJsZT50Ym9keT50cj50ZCxcclxuLnRhYmxlPnRib2R5PnRyPnRoLFxyXG4udGFibGU+dGZvb3Q+dHI+dGQsXHJcbi50YWJsZT50Zm9vdD50cj50aCxcclxuLnRhYmxlPnRoZWFkPnRyPnRkLFxyXG4udGFibGU+dGhlYWQ+dHI+dGgge1xyXG4gICAgcGFkZGluZzogOXB4IWltcG9ydGFudDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/military/components/student-age/student-age.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/military/components/student-age/student-age.component.ts ***!
  \**************************************************************************/
/*! exports provided: StudentAgeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentAgeComponent", function() { return StudentAgeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_academic_services_academic_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/academic/services/academic-setting.service */ "./src/app/academic/services/academic-setting.service.ts");
/* harmony import */ var src_app_academic_services_course_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/academic/services/course.service */ "./src/app/academic/services/course.service.ts");
/* harmony import */ var src_app_academic_services_report_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/academic/services/report-service.service */ "./src/app/academic/services/report-service.service.ts");
/* harmony import */ var src_app_account_services_student_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/account/services/student-account.service */ "./src/app/account/services/student-account.service.ts");
/* harmony import */ var src_app_adminision_services_application_setting_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/adminision/services/application-setting.service */ "./src/app/adminision/services/application-setting.service.ts");
/* harmony import */ var src_app_settings_services_setting_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/settings/services/setting.service */ "./src/app/settings/services/setting.service.ts");
/* harmony import */ var src_app_settings_setting_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/settings/setting-template */ "./src/app/settings/setting-template.ts");









var StudentAgeComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](StudentAgeComponent, _super);
    function StudentAgeComponent(courseService, studentAcountService, academicSettingService, reportService, settingService, applicationSetting) {
        var _this = _super.call(this, settingService) || this;
        _this.courseService = courseService;
        _this.studentAcountService = studentAcountService;
        _this.academicSettingService = academicSettingService;
        _this.reportService = reportService;
        _this.settingService = settingService;
        _this.applicationSetting = applicationSetting;
        _this.$ = $;
        _this.doc = document;
        _this.currentPage = 1;
        _this.totalPages = 10;
        _this.baseUrl = "military_age";
        _this.requiredFields = ['name'];
        _this.get();
        return _this;
    }
    StudentAgeComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    StudentAgeComponent.prototype.exportExcel = function () {
        var filename = "سن الطالب" + new Date().toLocaleTimeString();
        this.doc.exportExcel(filename);
    };
    StudentAgeComponent.prototype.print = function () {
        this.doc.printJs();
    };
    StudentAgeComponent.prototype.printContent = function () {
        this.doc.printJs();
    };
    StudentAgeComponent.prototype.action = function () {
        this.get();
    };
    StudentAgeComponent.prototype.onPageChange = function (page) {
        this.currentPage = page;
    };
    StudentAgeComponent.prototype.loadData = function () {
        var _this = this;
        this.reportService.getStudentsAge().subscribe(function (res) {
            _this.responses = res;
            _this.totalitem = _this.responses.length;
        });
    };
    StudentAgeComponent.prototype.updateDate = function () {
        var _this = this;
        this.responses = null;
        this.reportService.UpdateStudentsAge().subscribe(function (res) {
            _this.loadData();
        });
    };
    StudentAgeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-student-age',
            template: __webpack_require__(/*! ./student-age.component.html */ "./src/app/military/components/student-age/student-age.component.html"),
            styles: [__webpack_require__(/*! ./student-age.component.scss */ "./src/app/military/components/student-age/student-age.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_academic_services_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"],
            src_app_account_services_student_account_service__WEBPACK_IMPORTED_MODULE_5__["StudentAccountService"],
            src_app_academic_services_academic_setting_service__WEBPACK_IMPORTED_MODULE_2__["AcademicSettingService"],
            src_app_academic_services_report_service_service__WEBPACK_IMPORTED_MODULE_4__["ReportServiceService"], src_app_settings_services_setting_service__WEBPACK_IMPORTED_MODULE_7__["SettingService"],
            src_app_adminision_services_application_setting_service__WEBPACK_IMPORTED_MODULE_6__["ApplicationSettingService"]])
    ], StudentAgeComponent);
    return StudentAgeComponent;
}(src_app_settings_setting_template__WEBPACK_IMPORTED_MODULE_8__["SettingTemplate"]));



/***/ }),

/***/ "./src/app/military/military-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/military/military-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: MilitaryRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilitaryRoutingModule", function() { return MilitaryRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _military_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./military.component */ "./src/app/military/military.component.ts");
/* harmony import */ var _components_military_area_military_area_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/military-area/military-area.component */ "./src/app/military/components/military-area/military-area.component.ts");
/* harmony import */ var _components_military_status_military_status_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/military-status/military-status.component */ "./src/app/military/components/military-status/military-status.component.ts");
/* harmony import */ var _shared_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/auth */ "./src/app/shared/auth.ts");
/* harmony import */ var _shared_middlewares_auth_guest_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/middlewares/auth-guest.service */ "./src/app/shared/middlewares/auth-guest.service.ts");
/* harmony import */ var _components_student_age_student_age_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/student-age/student-age.component */ "./src/app/military/components/student-age/student-age.component.ts");









var routes = [
    {
        path: "",
        component: _military_component__WEBPACK_IMPORTED_MODULE_3__["MilitaryComponent"],
        children: [
            {
                path: 'area',
                canActivate: [_shared_middlewares_auth_guest_service__WEBPACK_IMPORTED_MODULE_7__["AuthGuestService"]],
                data: { can: _shared_auth__WEBPACK_IMPORTED_MODULE_6__["Auth"].can('military_area') },
                component: _components_military_area_military_area_component__WEBPACK_IMPORTED_MODULE_4__["MilitaryAreaComponent"]
            },
            {
                path: 'status',
                canActivate: [_shared_middlewares_auth_guest_service__WEBPACK_IMPORTED_MODULE_7__["AuthGuestService"]],
                data: { can: _shared_auth__WEBPACK_IMPORTED_MODULE_6__["Auth"].can('military_status') },
                component: _components_military_status_military_status_component__WEBPACK_IMPORTED_MODULE_5__["MilitaryStatusComponent"]
            },
            {
                path: 'student-age',
                canActivate: [_shared_middlewares_auth_guest_service__WEBPACK_IMPORTED_MODULE_7__["AuthGuestService"]],
                data: { can: _shared_auth__WEBPACK_IMPORTED_MODULE_6__["Auth"].can('military_status') },
                component: _components_student_age_student_age_component__WEBPACK_IMPORTED_MODULE_8__["StudentAgeComponent"]
            }
        ]
    }
];
var MilitaryRoutingModule = /** @class */ (function () {
    function MilitaryRoutingModule() {
    }
    MilitaryRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], MilitaryRoutingModule);
    return MilitaryRoutingModule;
}());



/***/ }),

/***/ "./src/app/military/military.component.html":
/*!**************************************************!*\
  !*** ./src/app/military/military.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-2\">\r\n\r\n            <!-- Profile Image -->\r\n            <div class=\"box box-primary\">\r\n                <div class=\"box-body box-profile\">\r\n                    <h3 class=\"profile-username text-center\">{{ \"military\" | trans }}</h3>\r\n                    <ul class=\"list-group list-group-unbordered\">\r\n                        <li class=\"list-group-item\" permission=\"military_area\">\r\n                            <a class=\"active\" routerLink=\"/military/area\"><i class=\"fa fa-circle-o\"></i>\r\n                {{ \"military_areas\" | trans }}\r\n              </a>\r\n                        </li>\r\n                        <li class=\"list-group-item\" permission=\"military_status\">\r\n                            <a class=\"active\" routerLink=\"/military/status\"><i class=\"fa fa-circle-o\"></i>\r\n                {{ \"military_status\" | trans }}\r\n              </a>\r\n                        </li>\r\n                        <li class=\"list-group-item\" permission=\"military_status\">\r\n                            <a class=\"active\" routerLink=\"/military/student-age\"><i class=\"fa fa-circle-o\"></i>\r\n                سن الطالب\r\n              </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"col-md-10\">\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/military/military.component.scss":
/*!**************************************************!*\
  !*** ./src/app/military/military.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21pbGl0YXJ5L21pbGl0YXJ5LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/military/military.component.ts":
/*!************************************************!*\
  !*** ./src/app/military/military.component.ts ***!
  \************************************************/
/*! exports provided: MilitaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilitaryComponent", function() { return MilitaryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MilitaryComponent = /** @class */ (function () {
    function MilitaryComponent() {
    }
    MilitaryComponent.prototype.ngOnInit = function () {
    };
    MilitaryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-military',
            template: __webpack_require__(/*! ./military.component.html */ "./src/app/military/military.component.html"),
            styles: [__webpack_require__(/*! ./military.component.scss */ "./src/app/military/military.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MilitaryComponent);
    return MilitaryComponent;
}());



/***/ }),

/***/ "./src/app/military/military.module.ts":
/*!*********************************************!*\
  !*** ./src/app/military/military.module.ts ***!
  \*********************************************/
/*! exports provided: MilitaryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilitaryModule", function() { return MilitaryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var angular_datatables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-datatables */ "./node_modules/angular-datatables/index.js");
/* harmony import */ var _military_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./military-routing.module */ "./src/app/military/military-routing.module.ts");
/* harmony import */ var _military_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./military.component */ "./src/app/military/military.component.ts");
/* harmony import */ var _components_military_area_military_area_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/military-area/military-area.component */ "./src/app/military/components/military-area/military-area.component.ts");
/* harmony import */ var _components_military_status_military_status_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/military-status/military-status.component */ "./src/app/military/components/military-status/military-status.component.ts");
/* harmony import */ var _components_student_age_student_age_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/student-age/student-age.component */ "./src/app/military/components/student-age/student-age.component.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");











var MilitaryModule = /** @class */ (function () {
    function MilitaryModule() {
    }
    MilitaryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_military_component__WEBPACK_IMPORTED_MODULE_6__["MilitaryComponent"], _components_military_area_military_area_component__WEBPACK_IMPORTED_MODULE_7__["MilitaryAreaComponent"], _components_military_status_military_status_component__WEBPACK_IMPORTED_MODULE_8__["MilitaryStatusComponent"], _components_student_age_student_age_component__WEBPACK_IMPORTED_MODULE_9__["StudentAgeComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _military_routing_module__WEBPACK_IMPORTED_MODULE_5__["MilitaryRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
                angular_datatables__WEBPACK_IMPORTED_MODULE_4__["DataTablesModule"], ngx_pagination__WEBPACK_IMPORTED_MODULE_10__["NgxPaginationModule"]
            ]
        })
    ], MilitaryModule);
    return MilitaryModule;
}());



/***/ })

}]);
//# sourceMappingURL=military-military-module.js.map