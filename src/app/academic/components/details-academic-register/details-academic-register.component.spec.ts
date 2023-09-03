import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAcademicRegisterComponent } from './details-academic-register.component';

describe('DetailsAcademicRegisterComponent', () => {
  let component: DetailsAcademicRegisterComponent;
  let fixture: ComponentFixture<DetailsAcademicRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAcademicRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAcademicRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
