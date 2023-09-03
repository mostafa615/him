import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaildStudentComponent } from './faild-student.component';

describe('FaildStudentComponent', () => {
  let component: FaildStudentComponent;
  let fixture: ComponentFixture<FaildStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaildStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaildStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
