import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UpdateCourseComponent } from './update-course.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { CourseDataService } from '../services/data/course-data.service';
import { of, throwError } from 'rxjs';
import { HomeComponent } from '../home/home.component';

describe('UpdateCourseComponent', () => {
  let component: UpdateCourseComponent;
  let fixture: ComponentFixture<UpdateCourseComponent>;
  let courseService: CourseDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent }
        ]),
      ],
      declarations: [ 
        UpdateCourseComponent, 
        HeaderNavComponent,
      ],
      providers: [ 
        CourseDataService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is form invalid when empty', () => {
    expect(component.updateForm.valid).toBeFalsy();
  });

  it('should get initial data for rendering', () => {
    spyOn(component, 'getCourseData');

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.authenticatedUser).toBeDefined();
    expect(component.courseId).toBeDefined();
    expect(component.getCourseData).toHaveBeenCalled();
  });

  it('is creatorId equal to NO_CONTENT on invalid courseId', () => {
    spyOn(courseService, 'getCourseDetails').and.returnValue(of(null));

    component.getCourseData();
    expect(courseService.getCourseDetails).toHaveBeenCalled();
    expect(component.creatorId).toMatch('NO_CONTENT');
  });

  it('is getUserData() called on valid courseId', () => {
    spyOn(courseService, 'getCourseDetails').and.returnValue(of({}));
    spyOn(component, 'getUserData');

    component.getCourseData();
    expect(courseService.getCourseDetails).toHaveBeenCalled();
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('is getUserDetails() called when getUserData() is invoked', () => {
    spyOn(courseService, 'getUserDetails').and.returnValue(of({}));

    component.getUserData();
    expect(courseService.getUserDetails).toHaveBeenCalled();
  });

  it('should set success to true on successful course updation', () => {
    spyOn(courseService, 'updateCourseDetails').and.returnValue(of({}));

    component.handleCourseUpdation();
    expect(courseService.updateCourseDetails).toHaveBeenCalled();
    expect(component.success).toBeTruthy();
  });

  it('should set failure to true on unsuccessful course updation', () => {
    spyOn(courseService, 'updateCourseDetails').and.returnValue(throwError({status: 404}));

    component.handleCourseUpdation();
    expect(courseService.updateCourseDetails).toHaveBeenCalled();
    expect(component.failure).toBeTruthy();
  });

});
