import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuContainerComponent } from './nav-menu';

describe('MenuContainerComponent', () => {
  let component: MenuContainerComponent;
  let fixture: ComponentFixture<MenuContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
