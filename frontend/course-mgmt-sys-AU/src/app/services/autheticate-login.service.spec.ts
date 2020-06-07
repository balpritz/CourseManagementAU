import { TestBed } from '@angular/core/testing';

import { AutheticateLoginService } from './autheticate-login.service';
import { HttpClientModule } from '@angular/common/http';

describe('AutheticateLoginService', () => {
  let service: AutheticateLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(AutheticateLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
