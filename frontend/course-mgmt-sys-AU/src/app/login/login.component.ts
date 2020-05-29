import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailId: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'emailId': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('', Validators.required)
    });
  }

  handleLogin() {
    this.route.navigate(['home']); 
  }
}
