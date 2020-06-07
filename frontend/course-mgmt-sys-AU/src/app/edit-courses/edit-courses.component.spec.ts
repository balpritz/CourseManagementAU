import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursesComponent } from './edit-courses.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { FormsModule } from '@angular/forms';

describe('EditCoursesComponent', () => {
  let component: EditCoursesComponent;
  let fixture: ComponentFixture<EditCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        EditCoursesComponent,
        HeaderNavComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
