import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicReportDailyComponent } from './academic-report-daily.component';

describe('AcademicReportDailyComponent', () => {
  let component: AcademicReportDailyComponent;
  let fixture: ComponentFixture<AcademicReportDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicReportDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicReportDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
