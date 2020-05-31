import { TestBed } from '@angular/core/testing';

import { RegisterGoogleUsersService } from './register-google-users.service';

describe('RegisterGoogleUsersService', () => {
  let service: RegisterGoogleUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterGoogleUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
