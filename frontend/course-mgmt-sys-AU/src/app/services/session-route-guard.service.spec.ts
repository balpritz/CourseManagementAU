import { TestBed, getTestBed } from '@angular/core/testing';

import { SessionRouteGuardService } from './session-route-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AUTHENTICATED_USER } from '../app.constants';

describe('SessionRouteGuardService', () => {
  let injector: TestBed;
  let service: SessionRouteGuardService;
  let router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: Router, useValue: router},
        SessionRouteGuardService,
      ]
    });
    injector = getTestBed();
    service = injector.get(SessionRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to home page if already logged in', () => {
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    sessionStorage.setItem(AUTHENTICATED_USER, 'balpreet');
    service.canActivate(route, state);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
    sessionStorage.clear();
  });

  it('should allow routing is not logged in', () => {
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    sessionStorage.clear();
    var result = service.canActivate(route, state);
    expect(result).toBeTruthy();
  });

});
