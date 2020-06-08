import { TestBed, getTestBed } from '@angular/core/testing';

import { AutheticateLoginService } from './autheticate-login.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_URL, AUTHENTICATED_USER, PASSWORD } from '../app.constants';

describe('AutheticateLoginService', () => {
  let service: AutheticateLoginService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ AutheticateLoginService, ]
    });
    injector = getTestBed();
    service = injector.get(AutheticateLoginService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set sessionStorage on valid user data', () => {
    const dummyUser = {
      id: 'INT403',
      password: 'abc',
    };

    sessionStorage.removeItem(AUTHENTICATED_USER);
    service.executeLoginAuthentication('abc@gmail.com', 'abc').subscribe(
      data => {
        expect(data).toEqual(dummyUser);
        expect(sessionStorage.getItem(AUTHENTICATED_USER)).toMatch('INT403');
      }
    );

    const req = httpMock.expectOne(`${API_URL}/authenticate`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(PASSWORD);
  });

  it('should not set sessionStorage on null data', () => {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    service.executeLoginAuthentication('abc@gmail.com', 'abc').subscribe(
      data => {
        expect(data).toBeNull();
        expect(sessionStorage.getItem(AUTHENTICATED_USER)).toBeNull();
      }
    );

    const req = httpMock.expectOne(`${API_URL}/authenticate`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

});
