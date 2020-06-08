import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavComponent } from './header-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AUTHENTICATED_USER } from '../app.constants';
import { By } from '@angular/platform-browser';

describe('HeaderNavComponent', () => {
  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ HeaderNavComponent ],
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

  it('should clear session storage upon logout', () => {
    component.handleLogout();
    expect(sessionStorage.getItem(AUTHENTICATED_USER)).toBeNull();
  });

  it('should invoke handleSearch upon query', () => {
    spyOn(component, 'handleSearch');

    let searchField = fixture.debugElement.query(By.css('.mock_search'));
    searchField.triggerEventHandler('keyup.enter', {});
    
    expect(component.handleSearch).toHaveBeenCalled();
    expect(component.searchString).toBe('');
  });

});
