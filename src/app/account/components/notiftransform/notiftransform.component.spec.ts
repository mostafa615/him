/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotiftransformComponent } from './notiftransform.component';

describe('NotiftransformComponent', () => {
  let component: NotiftransformComponent;
  let fixture: ComponentFixture<NotiftransformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiftransformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiftransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
