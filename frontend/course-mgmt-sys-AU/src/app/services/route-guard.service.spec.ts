import { TestBed } from '@angular/core/testing';

import { RouteGuardService } from './route-guard.service';
import { AppRoutingModule } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('RouteGuardService', () => {
  let service: RouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouterTestingModule,
      ]
    });
    service = TestBed.inject(RouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
