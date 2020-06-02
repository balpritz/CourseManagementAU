import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { RouteGuardService } from './services/route-guard.service';
import { SessionRouteGuardService } from './services/session-route-guard.service';
import { CourseMainpageComponent } from './course-mainpage/course-mainpage.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SessionRouteGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardService] },
  { path: 'new-course', component: NewCourseComponent, canActivate: [RouteGuardService] },
  { path: 'view-courses', component: ViewCoursesComponent, canActivate: [RouteGuardService] },
  { path: 'view-courses/:id', component: CourseMainpageComponent, canActivate: [RouteGuardService] },
  { path: 'edit-courses', component: EditCoursesComponent, canActivate: [RouteGuardService] },
  { path: 'edit-courses/update/:id', component: UpdateCourseComponent, canActivate: [RouteGuardService] },
  { path: 'search-results', component: SearchResultsComponent, canActivate: [RouteGuardService] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
