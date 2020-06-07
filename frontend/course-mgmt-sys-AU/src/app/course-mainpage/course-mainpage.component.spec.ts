import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMainpageComponent } from './course-mainpage.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderNavComponent } from '../header-nav/header-nav.component';

describe('CourseMainpageComponent', () => {
  let component: CourseMainpageComponent;
  let fixture: ComponentFixture<CourseMainpageComponent>;

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
      ]
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
