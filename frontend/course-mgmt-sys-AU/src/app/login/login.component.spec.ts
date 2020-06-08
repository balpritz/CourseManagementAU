import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceConfig, SocialLoginModule, AuthService } from 'angularx-social-login';
import { getAuthServiceConfigs } from '../socialloginConfig';
import { HttpClientModule } from '@angular/common/http';
import { AutheticateLoginService } from '../services/autheticate-login.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RegisterGoogleUsersService } from '../services/register-google-users.service';

describe('LoginComponent Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authLogin: AutheticateLoginService;
  let socialAuthService: AuthService;
  let googleLogin: RegisterGoogleUsersService;
  let router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        FormsModule, 
        ReactiveFormsModule, 
        SocialLoginModule,
        HttpClientModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
        AutheticateLoginService,
        AuthService,
        RegisterGoogleUsersService,
        { provide: Router, useValue: router},
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authLogin = TestBed.get(AutheticateLoginService);
    socialAuthService = TestBed.get(AuthService);
    googleLogin = TestBed.get(RegisterGoogleUsersService);
    fixture.detectChanges();
  });

  // isolated tests on the login component

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is component initial state ok', () => {
    expect(component.invalidLogin).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.emailId).toBeUndefined();
    expect(component.password).toBeUndefined();
  });

  it('is form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls['emailId'].setValue('abc@gmail.com');
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls['password'].setValue('abc');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('is form invalid when provided bad email', () => {
    component.loginForm.controls['emailId'].setValue('gibberish.com');
    component.loginForm.controls['password'].setValue('abc');

    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls['emailId'].setValue('abc@gmail.com');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should set invalid property if bad credentials', () => {
    spyOn(authLogin, 'executeLoginAuthentication').and.returnValue(of(null));
    
    component.handleLogin();
    expect(authLogin.executeLoginAuthentication).toHaveBeenCalled();
    expect(component.invalidLogin).toBeTruthy();
  });

  it('should navigate to home on valid credentials', () => {
    spyOn(authLogin, 'executeLoginAuthentication').and.returnValue(of({}));
    
    component.handleLogin();
    expect(authLogin.executeLoginAuthentication).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should trigger signinWithGoogle() on google login button click', fakeAsync(() => {
    spyOn(component, 'signinWithGoogle');

    let button = fixture.debugElement.nativeElement.querySelector('#normalLogin')
    button.click();
    tick();
    expect(component.signinWithGoogle).toHaveBeenCalled();
  }));

  it('should trigger handleLogin() on login button click', fakeAsync(() => {
    spyOn(component, 'handleLogin');

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    tick();
    expect(component.handleLogin).toHaveBeenCalled();
  }));

  it('should navigate to home on successful google login', () => {
    spyOn(socialAuthService, 'signIn').and.returnValue(Promise.resolve(null));
    spyOn(googleLogin, 'executeGoogleSignIn').and.returnValue(of(null));

    component.signinWithGoogle();
    
    expect(socialAuthService.signIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should set invalidLogin to true upon invalid google credential', fakeAsync(() => {
    spyOn(socialAuthService, 'signIn').and.returnValue(Promise.reject('test error'));

    component.signinWithGoogle();
    tick();
    expect(component.invalidLogin).toBeTruthy();
  }));

});
