import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UpdateCourseComponent } from './update-course.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderNavComponent } from '../header-nav/header-nav.component';

describe('UpdateCourseComponent', () => {
  let component: UpdateCourseComponent;
  let fixture: ComponentFixture<UpdateCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ 
        UpdateCourseComponent, 
        HeaderNavComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
