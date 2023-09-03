import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedtermComponent } from './medterm.component';

describe('MedtermComponent', () => {
  let component: MedtermComponent;
  let fixture: ComponentFixture<MedtermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedtermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedtermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
