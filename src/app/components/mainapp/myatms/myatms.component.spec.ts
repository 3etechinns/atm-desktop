import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyatmsComponent } from './myatms.component';

describe('MyatmsComponent', () => {
  let component: MyatmsComponent;
  let fixture: ComponentFixture<MyatmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyatmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyatmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
