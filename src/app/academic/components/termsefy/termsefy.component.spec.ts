import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsefyComponent } from './termsefy.component';

describe('TermsefyComponent', () => {
  let component: TermsefyComponent;
  let fixture: ComponentFixture<TermsefyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsefyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsefyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
