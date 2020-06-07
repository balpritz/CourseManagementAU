import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NewCourseComponent } from './new-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderNavComponent } from '../header-nav/header-nav.component';

describe('NewCourseComponent', () => {
  let component: NewCourseComponent;
  let fixture: ComponentFixture<NewCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
