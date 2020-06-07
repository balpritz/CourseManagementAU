import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavComponent } from './header-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('HeaderNavComponent', () => {
  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ HeaderNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
