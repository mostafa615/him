import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaqderComponent } from './taqder.component';

describe('TaqderComponent', () => {
  let component: TaqderComponent;
  let fixture: ComponentFixture<TaqderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaqderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaqderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
