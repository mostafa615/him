import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequsiteComponent } from './prerequsite.component';

describe('PrerequsiteComponent', () => {
  let component: PrerequsiteComponent;
  let fixture: ComponentFixture<PrerequsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrerequsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerequsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
