import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCourseComponent } from './app-course.component';

describe('AppCourseComponent', () => {
  let component: AppCourseComponent;
  let fixture: ComponentFixture<AppCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
