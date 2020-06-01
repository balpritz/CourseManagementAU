import { TestBed } from '@angular/core/testing';

import { SessionRouteGuardService } from './session-route-guard.service';

describe('SessionRouteGuardService', () => {
  let service: SessionRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
