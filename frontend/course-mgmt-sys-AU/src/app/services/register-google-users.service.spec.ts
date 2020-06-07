import { TestBed } from '@angular/core/testing';

import { RegisterGoogleUsersService } from './register-google-users.service';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterGoogleUsersService', () => {
  let service: RegisterGoogleUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(RegisterGoogleUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
