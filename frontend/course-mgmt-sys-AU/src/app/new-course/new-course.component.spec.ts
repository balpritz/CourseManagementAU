import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NewCourseComponent } from './new-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { CourseDataService } from '../services/data/course-data.service';
import { of, throwError } from 'rxjs';
import { HomeComponent } from '../home/home.component';

describe('NewCourseComponent', () => {
  let component: NewCourseComponent;
  let fixture: ComponentFixture<NewCourseComponent>;
  let courseService: CourseDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
        HttpClientModule,
      ],
      declarations: [ 
        NewCourseComponent,
        HeaderNavComponent, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is component initial state ok', () => {
    expect(component.newCourseForm.invalid).toBeTruthy();
    expect(component.courseTitle).toBeUndefined();
    expect(component.courseDescription).toBeUndefined();
    expect(component.skillsAcquired).toBeUndefined();
    expect(component.success).toBeFalsy();
    expect(component.failure).toBeFalsy();
  });

  it('should set success to true upon successful course creation', () => {
    spyOn(courseService, 'createNewCourse').and.returnValue(of({}));

    component.handleNewCourseAddition();
    expect(courseService.createNewCourse).toHaveBeenCalled();
    expect(component.success).toBeTruthy();
  });

  it('should set failure to true upon unsuccessful course creation', () => {
    spyOn(courseService, 'createNewCourse').and.returnValue(throwError(404));

    component.handleNewCourseAddition();
    expect(courseService.createNewCourse).toHaveBeenCalled();
    expect(component.failure).toBeTruthy();
  });

});
