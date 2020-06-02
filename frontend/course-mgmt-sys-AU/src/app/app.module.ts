import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { getAuthServiceConfigs } from './socialloginConfig';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { CourseMainpageComponent } from './course-mainpage/course-mainpage.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    HeaderNavComponent,
    NewCourseComponent,
    ViewCoursesComponent,
    CourseMainpageComponent,
    EditCoursesComponent,
    UpdateCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs,
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
