/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraduationGovComponent } from './graduation-gov.component';

describe('GraduationGovComponent', () => {
  let component: GraduationGovComponent;
  let fixture: ComponentFixture<GraduationGovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduationGovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduationGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
