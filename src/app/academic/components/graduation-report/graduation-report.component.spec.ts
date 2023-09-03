/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraduationReportComponent } from './graduation-report.component';

describe('GraduationReportComponent', () => {
  let component: GraduationReportComponent;
  let fixture: ComponentFixture<GraduationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
