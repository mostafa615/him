import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAffairStudentStatusComponent } from './student-affair-student-status.component';

describe('StudentAffairStudentStatusComponent', () => {
  let component: StudentAffairStudentStatusComponent;
  let fixture: ComponentFixture<StudentAffairStudentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAffairStudentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAffairStudentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
