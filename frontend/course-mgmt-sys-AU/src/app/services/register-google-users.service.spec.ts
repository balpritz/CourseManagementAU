import { TestBed, getTestBed } from '@angular/core/testing';

import { RegisterGoogleUsersService } from './register-google-users.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AUTHENTICATED_USER, PASSWORD, API_URL } from '../app.constants';

describe('RegisterGoogleUsersService', () => {
  let service: RegisterGoogleUsersService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ RegisterGoogleUsersService, ]
    });
    injector = getTestBed();
    service = injector.get(RegisterGoogleUsersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set session storage upon valid credentials', () => {
    const dummyUser = { id: 'INT403' };

    sessionStorage.removeItem(AUTHENTICATED_USER);
    service.executeGoogleSignIn({
        authToken: '',
        email: '',
        firstName: '',
        id: '',
        idToken: 'test',
        lastName: '',
        name: '',
        photoUrl: '',
        provider: '',
    }).subscribe(
      data => {
        expect(data).toEqual(dummyUser);
        expect(sessionStorage.getItem(AUTHENTICATED_USER)).toMatch('INT403');
        expect(sessionStorage.getItem(PASSWORD)).toMatch('test');
      }
    );

    const req = httpMock.expectOne(`${API_URL}/authenticate-google-user`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(PASSWORD);
  });

});
