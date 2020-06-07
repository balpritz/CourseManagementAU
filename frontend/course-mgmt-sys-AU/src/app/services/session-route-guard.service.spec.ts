import { TestBed } from '@angular/core/testing';

import { SessionRouteGuardService } from './session-route-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SessionRouteGuardService', () => {
  let service: SessionRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ]
    });
    service = TestBed.inject(SessionRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
