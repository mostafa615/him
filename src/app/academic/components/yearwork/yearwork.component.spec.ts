import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearworkComponent } from './yearwork.component';

describe('YearworkComponent', () => {
  let component: YearworkComponent;
  let fixture: ComponentFixture<YearworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
