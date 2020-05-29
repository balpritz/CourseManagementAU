import { TestBed } from '@angular/core/testing';

import { AutheticateLoginService } from './autheticate-login.service';

describe('AutheticateLoginService', () => {
  let service: AutheticateLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutheticateLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
