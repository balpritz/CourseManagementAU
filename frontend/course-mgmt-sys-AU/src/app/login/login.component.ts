import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AutheticateLoginService } from '../services/autheticate-login.service';

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
    private authLogin: AutheticateLoginService) { }

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

    this.authLogin.executeLoginAuthentication(this.emailId, this.password).subscribe(
      data => this.route.navigate(['home']),
      error => this.invalidLogin = true
    );
  }

  signinWithGoogle() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider)
    .then((userData) => {
        console.log(userData);
    });

    this.route.navigate(['home']);
  }
}
