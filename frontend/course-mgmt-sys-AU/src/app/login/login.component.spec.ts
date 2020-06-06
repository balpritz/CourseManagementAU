import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { getAuthServiceConfigs } from '../socialloginConfig';
import { HttpClientModule } from '@angular/common/http';

fdescribe('LoginComponent Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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

});
