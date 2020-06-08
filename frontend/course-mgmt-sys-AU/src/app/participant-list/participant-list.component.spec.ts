import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantListComponent } from './participant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { FormsModule } from '@angular/forms';
import { CourseDataService } from '../services/data/course-data.service';
import { of } from 'rxjs';

describe('ParticipantListComponent', () => {
  let component: ParticipantListComponent;
  let fixture: ComponentFixture<ParticipantListComponent>;
  let courseService: CourseDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        ParticipantListComponent,
        HeaderNavComponent, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantListComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set creatorId if valid course data present', () => {
    spyOn(courseService, 'getCourseDetails').and.returnValue(of({
      creatorId: 'balpreet',
    }));

    component.getCourseData();
    expect(component.creatorId).toMatch('balpreet');
  });

  it('should set creatorId to NO_CONTENT if invalid course data present', () => {
    spyOn(courseService, 'getCourseDetails').and.returnValue(of(null));

    component.getCourseData();
    expect(component.creatorId).toMatch('NO_CONTENT');
  });

  it('should get enrollmentData successfully', () => {
    spyOn(courseService, 'retrieveCourseEnrollementData').and.returnValue(of({
      data: 'test',
    }));

    component.getCourseEnrollmentData();
    expect(courseService.retrieveCourseEnrollementData).toHaveBeenCalled();
    expect(component.enrollmentData.data).toMatch('test');
  });

});
