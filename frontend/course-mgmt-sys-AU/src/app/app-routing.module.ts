import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { RouteGuardService } from './services/route-guard.service';
import { SessionRouteGuardService } from './services/session-route-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SessionRouteGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardService] },
  { path: 'new-course', component: NewCourseComponent, canActivate: [RouteGuardService] },
  { path: 'view-courses', component: ViewCoursesComponent, canActivate: [RouteGuardService] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
