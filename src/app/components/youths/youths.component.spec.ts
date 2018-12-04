import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthsComponent } from './youths.component';

describe('YouthsComponent', () => {
  let component: YouthsComponent;
  let fixture: ComponentFixture<YouthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
