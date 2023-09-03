import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCoursesReportComponent } from './available-courses-report.component';

describe('AvailableCoursesReportComponent', () => {
  let component: AvailableCoursesReportComponent;
  let fixture: ComponentFixture<AvailableCoursesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableCoursesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCoursesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
