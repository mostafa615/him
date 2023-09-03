/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Allgrdlevel2Component } from './allgrdlevel2.component';

describe('Allgrdlevel2Component', () => {
  let component: Allgrdlevel2Component;
  let fixture: ComponentFixture<Allgrdlevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Allgrdlevel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Allgrdlevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
