import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNumbersComponent } from './set-numbers.component';

describe('SetNumbersComponent', () => {
  let component: SetNumbersComponent;
  let fixture: ComponentFixture<SetNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
