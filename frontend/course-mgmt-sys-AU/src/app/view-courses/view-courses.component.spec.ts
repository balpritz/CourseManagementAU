import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursesComponent } from './view-courses.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ViewCoursesComponent', () => {
  let component: ViewCoursesComponent;
  let fixture: ComponentFixture<ViewCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        ViewCoursesComponent,
        HeaderNavComponent, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
