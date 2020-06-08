import { TestBed, getTestBed } from '@angular/core/testing';

import { RouteGuardService } from './route-guard.service';
import { AppRoutingModule } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AUTHENTICATED_USER } from '../app.constants';

describe('RouteGuardService', () => {
  let injector: TestBed;
  let service: RouteGuardService;
  let router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouterTestingModule,
      ],
      providers: [ 
        { provide: Router, useValue: router},
        RouteGuardService,
      ]
    });
    injector = getTestBed();
    service = injector.get(RouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to login page when not logged in', () => {
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    sessionStorage.clear();
    service.canActivate(route, state);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should allow routing if logged in', () => {
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    sessionStorage.setItem(AUTHENTICATED_USER, 'balpreet');
    var result = service.canActivate(route, state);
    expect(result).toBeTruthy();
    sessionStorage.clear();
  });

});
