import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsRoomsManageReportComponent } from './students-rooms-manage-report.component';

describe('StudentsRoomsManageReportComponent', () => {
  let component: StudentsRoomsManageReportComponent;
  let fixture: ComponentFixture<StudentsRoomsManageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsRoomsManageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsRoomsManageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
