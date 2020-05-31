import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AutheticateLoginService } from '../services/autheticate-login.service';
import { RegisterGoogleUsersService } from '../services/register-google-users.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailId: string;
  password: string;
  invalidLogin: boolean = false;
  loginForm: FormGroup;

  constructor(private route: Router, 
    private fb: FormBuilder, 
    private socialAuthService: AuthService,
    private authLogin: AutheticateLoginService,
    private googleLogin: RegisterGoogleUsersService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'emailId': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('', Validators.required)
    });
  }

  handleLogin() {
    this.invalidLogin = false;
    this.emailId = this.loginForm.get('emailId').value;
    this.password = this.loginForm.get('password').value;
    let hashedPasword = Md5.hashStr(this.password).toString();

    this.authLogin.executeLoginAuthentication(this.emailId, hashedPasword).subscribe(
      data => this.route.navigate(['home']),
      error => this.invalidLogin = true
    );
  }

  signinWithGoogle() {
    this.invalidLogin = false;
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider)
    .then((userData) => {
      this.googleLogin.executeGoogleSignIn(userData).subscribe(
        data => this.route.navigate(['home']),
        error => this.invalidLogin = true
      );
    }).catch(error => this.invalidLogin = true);
  }
}
