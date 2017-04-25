import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPostComponent } from './app-post.component';

describe('AppPostComponent', () => {
  let component: AppPostComponent;
  let fixture: ComponentFixture<AppPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
