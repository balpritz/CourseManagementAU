import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';
import { Router } from '@angular/router';
import { AUTHENTICATED_USER } from '../app.constants';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {

  courseList: any;
  user: any;
  successDel: boolean = false;
  successStatus: boolean = false;
  toggle: string;

  constructor(private courseService: CourseDataService, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
    this.getAllCourseData();
  }

  getUserData() {
    this.courseService.getUserDetails(sessionStorage.getItem(AUTHENTICATED_USER)).subscribe(
      data => this.user = data
    );
  }

  getAllCourseData(){
    this.successDel = false;
    this.successStatus = false;
    this.courseService.getAllCourseDetails().subscribe(
      data => this.courseList = data
    );
  }

  handleCourseDeletion(courseId: number) {
    this.successDel = false;
    this.courseService.deleteCourse(courseId).subscribe(
      data => {
        this.successDel = true;
        setTimeout(() => {
          this.getAllCourseData();
        },
        3000);
      }
    );
  }

  handleStatusUpdate(courseId: number, courseStatus: boolean) {
    this.successStatus = false;

    this.courseService.getCourseDetails(courseId).subscribe(
      data => {
        this.courseService.updateCourseStatus(data, courseStatus).subscribe(
        response => {
          this.successStatus = true;
          setTimeout(() => {
            this.getAllCourseData();
          },
          3000);
        });
      }
    );
  }
  
}
