import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditHoursComponent } from './credit-hours.component';

describe('CreditHoursComponent', () => {
  let component: CreditHoursComponent;
  let fixture: ComponentFixture<CreditHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
