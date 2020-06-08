import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CourseDataService } from '../services/data/course-data.service';
import { of } from 'rxjs';
import { AUTHENTICATED_USER } from '../app.constants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let courseService: CourseDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        HomeComponent,
        HeaderNavComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve user details successfully', () => {
    spyOn(courseService, 'getUserDetails').and.returnValue(of({}));
    spyOn(component, 'getGlobalStats');

    component.retrieveUserDetails();
    expect(courseService.getUserDetails).toHaveBeenCalled();
    expect(component.getGlobalStats).toHaveBeenCalled();
  });

  it('should successfully retrieve user enrollment data', () => {
    spyOn(courseService, 'retrieveUserEnrollmentData').and.returnValue(of([{}]));

    component.getUserEnrollmentData();
    expect(component.enrollmentCount).toEqual(1);
  });

  it('should set enrollment count correctly', () => {
    spyOn(courseService, 'retrieveUserEnrollmentData').and.returnValue(of(null));

    component.getUserEnrollmentData();
    expect(component.enrollmentCount).toEqual(0);
  });

  it('should correctly computer statistics', () => {
    let courseData: any = [
      {
        isCourseActive: true,
        creatorId: 'balpreet',
      },
      {
        isCourseActive: false,
        creatorId: 'pawan',
      },
    ];

    sessionStorage.setItem(AUTHENTICATED_USER, 'balpreet');
    component.computeStatistics(courseData);
    
    expect(component.courseStats[0].value).toEqual(1);
    expect(component.courseStats[1].value).toEqual(1);
    expect(component.courseCreated).toEqual(1);
    sessionStorage.removeItem(AUTHENTICATED_USER);
  });

});
