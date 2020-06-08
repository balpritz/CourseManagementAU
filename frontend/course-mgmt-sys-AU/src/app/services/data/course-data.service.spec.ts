import { TestBed, getTestBed } from '@angular/core/testing';

import { CourseDataService } from './course-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { API_URL } from 'src/app/app.constants';

describe('CourseDataService', () => {
  let service: CourseDataService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ CourseDataService ]
    });
    injector = getTestBed();
    service = injector.get(CourseDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new course successfully', () => {
    const course = {
      courseTitle: 'A Test Story',
      courseDescription: 'abc',
      skillsAcquired: 'none',
      githubRepoLink: 'xyz.com',
    };

    service.createNewCourse(course.courseTitle, course.courseDescription, course.skillsAcquired, course.githubRepoLink).subscribe(
      data => expect(data).toEqual(course)
    );

    const req = httpMock.expectOne(`${API_URL}/add-new-course`);
    expect(req.request.method).toBe('POST');
    req.flush(course);
  });

  it('should get all course data', () => {
    const courses = [ {courseTitle: 'ABC'}, {courseTitle: 'DEF'} ];

    service.getAllCourseDetails().subscribe(
      data => expect(data).toEqual(courses)
    );

    const req = httpMock.expectOne(`${API_URL}/get/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(courses);
  });

  it('should get all user data', () => {
    const users = [ {userId: 'INT403'}, {userId: 'INT406'} ];

    service.getAllUserDetails().subscribe(
      data => expect(data).toEqual(users)
    );

    const req = httpMock.expectOne(`${API_URL}/get/users`);
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('should get a user detail by id', () => {
    const user = {userId: 'INT406'};

    service.getUserDetails('INT406').subscribe(
      data => expect(data).toEqual(user)
    );

    const req = httpMock.expectOne(`${API_URL}/get/users/${user.userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('should get a course detail by id', () => {
    const course = {courseId: 1};

    service.getCourseDetails(course.courseId).subscribe(
      data => expect(data).toEqual(course)
    );

    const req = httpMock.expectOne(`${API_URL}/get/courses/${course.courseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(course);
  });

});
