import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMainpageComponent } from './course-mainpage.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { CourseDataService } from '../services/data/course-data.service';
import { of } from 'rxjs';

describe('CourseMainpageComponent', () => {
  let component: CourseMainpageComponent;
  let fixture: ComponentFixture<CourseMainpageComponent>;
  let courseService: CourseDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ 
        CourseMainpageComponent,
        HeaderNavComponent, 
      ],
      providers: [ CourseDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMainpageComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set creatorId to NO_CONTENT on invalid course id', () => {
    spyOn(courseService, 'getCourseDetails').and.returnValue(of(null));

    component.getCourseData();
    expect(courseService.getCourseDetails).toHaveBeenCalled();
    expect(component.creatorId).toMatch('NO_CONTENT');
  });

  it('should invoke getCreatorData on valid course id', () => {
    spyOn(courseService, 'getCourseDetails').and.returnValue(of({
      skillsAcquired: "test data",
      creatorId: "INT403",
    }));
    spyOn(component, 'getCreatorData');

    component.getCourseData();
    expect(courseService.getCourseDetails).toHaveBeenCalled();
    expect(component.courseData).toBeDefined();
    expect(component.creatorId).toMatch('INT403');
  });

  it('should invoke retrieve enrollment status', () => {
    spyOn(courseService, 'retrieveEnrollmentStatus').and.returnValue(of(true));

    component.getEnrollementStatus();
    expect(courseService.retrieveEnrollmentStatus).toHaveBeenCalled();
    expect(component.isEnrolled).toBeTruthy();
  });

  it('should calculate average ratings correctly if enrollment data present', () => {
    component.loggedInUserId = 'INT403';
    component.enrollmentData = [
      {
        feedback: 'great',
        rating: 5,
        id: { userId: 'INT403' },
      }
    ];

    component.calculateAverageRatings();
    expect(component.feedbackCount).toEqual(1);
    expect(component.averageCourseRating).toEqual(5);
  });

  it('should calculate average ratings correctly if enrollment data present but no feedback', () => {
    component.loggedInUserId = 'INT403';
    component.enrollmentData = [
      {
        rating: 5,
        id: { userId: 'INT403' },
      }
    ];

    component.calculateAverageRatings();
    expect(component.feedbackStatus).toBeFalsy();
    expect(component.feedbackCount).toEqual(0);
    expect(component.averageCourseRating).toEqual(0);
  });

  it('should set feedbackStatus correctly if loggedInUser has not given feedback', () => {
    component.loggedInUserId = 'INT403';
    component.enrollmentData = [
      {
        rating: 5,
        id: { userId: 'INT406' },
      }
    ];

    component.calculateAverageRatings();
    expect(component.feedbackStatus).toBeUndefined();
  });

  it('should calculate average ratings correctly if enrollment data not present', () => {
    component.enrollmentData = [];

    component.calculateAverageRatings();
    expect(component.feedbackCount).toEqual(0);
    expect(component.averageCourseRating).toEqual(0);
  });

  it('should invoke provide feedback on feedback submission', () => {
    spyOn(courseService, 'provideFeedback').and.returnValue(of({}));

    component.handlefeedbackSubmission();
    expect(courseService.provideFeedback).toHaveBeenCalled();
  });

  it('should invoke getUserDetails() on getCreatorData call', () => {
    spyOn(courseService, 'getUserDetails').and.returnValue(of({}));

    component.getCreatorData();
    expect(component.creatorData).toEqual({});
  });

  it('should enroll user for a course successfully', () => {
    spyOn(courseService, 'enrollUserForACourse').and.returnValue(of({}));

    component.enrollUser();
    expect(component.isEnrolled).toBeTruthy();
  });

  it('should retrieve course enrollment data', () => {
    spyOn(courseService, 'retrieveCourseEnrollementData').and.returnValue(of([]));
    spyOn(component, 'calculateAverageRatings');

    component.getCourseEnrollmentData();
    expect(courseService.retrieveCourseEnrollementData).toHaveBeenCalled();
    expect(component.enrolledTraineeCount).toEqual(0);
    expect(component.calculateAverageRatings).toHaveBeenCalled();
  });

});
