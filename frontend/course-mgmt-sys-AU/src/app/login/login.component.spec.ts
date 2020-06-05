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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
