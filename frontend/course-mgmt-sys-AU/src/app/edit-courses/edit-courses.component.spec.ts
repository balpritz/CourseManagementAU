import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursesComponent } from './edit-courses.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { FormsModule } from '@angular/forms';
import { CourseDataService } from '../services/data/course-data.service';
import { of } from 'rxjs';

describe('EditCoursesComponent', () => {
  let component: EditCoursesComponent;
  let fixture: ComponentFixture<EditCoursesComponent>;
  let courseService: CourseDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        EditCoursesComponent,
        HeaderNavComponent,
      ],
      providers: [ CourseDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoursesComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is component initial state ok', () => {
    expect(component.courseList).toBeUndefined();
    expect(component.user).toBeUndefined();
    expect(component.successDel).toBeFalsy();
    expect(component.successStatus).toBeFalsy();
    expect(component.toggle).toBeUndefined();
  });

  it('should invoke getUserData and getAllCourseData on ngOnIt', () => {
    spyOn(component, 'getUserData');
    spyOn(component, 'getAllCourseData');

    component.ngOnInit();
    expect(component.getUserData).toHaveBeenCalled();
    expect(component.getAllCourseData).toHaveBeenCalled();
  });

  it('should call getUserDetails on invoking getUserData', () => {
    spyOn(courseService, 'getUserDetails').and.returnValue(of({}));

    component.getUserData();
    expect(courseService.getUserDetails).toHaveBeenCalled();
  });

  it('should set successDel to true upon successful deletion', () => {
    spyOn(courseService, 'deleteCourse').and.returnValue(of({}));

    component.handleCourseDeletion(1);
    expect(courseService.deleteCourse).toHaveBeenCalled();
    expect(component.successDel).toBeTruthy();
  });

  it('should set successStatus to true upon successful status update', () => {
    spyOn(courseService, 'getCourseDetails').and.returnValue(of({}));
    spyOn(courseService, 'updateCourseStatus').and.returnValue(of({}));

    component.handleStatusUpdate(1, true);
    expect(courseService.getCourseDetails).toHaveBeenCalled();
    expect(courseService.updateCourseStatus).toHaveBeenCalled();
    expect(component.successStatus).toBeTruthy();
  });

  it('should successfully retrieve all course data', () => {
    spyOn(courseService, 'getAllCourseDetails').and.returnValue(of({}));

    component.getAllCourseData();
    expect(courseService.getAllCourseDetails).toHaveBeenCalled();
    expect(component.courseList).toEqual({});
  });

});
