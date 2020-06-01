import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMainpageComponent } from './course-mainpage.component';

describe('CourseMainpageComponent', () => {
  let component: CourseMainpageComponent;
  let fixture: ComponentFixture<CourseMainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
