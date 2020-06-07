import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { FormsModule } from '@angular/forms';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        ErrorComponent,
        HeaderNavComponent, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
