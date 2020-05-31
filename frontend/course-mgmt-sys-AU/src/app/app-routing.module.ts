import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-course', component: NewCourseComponent },
  { path: 'view-courses', component: ViewCoursesComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
