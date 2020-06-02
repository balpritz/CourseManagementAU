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
  success: boolean = false;

  constructor(private courseService: CourseDataService) { }

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
    this.success = false;
    this.courseService.getAllCourseDetails().subscribe(
      data => this.courseList = data
    );
  }

  handleCourseDeletion(courseId: number) {
    this.success = false;
    this.courseService.deleteCourse(courseId).subscribe(
      data => {
        this.success = true;
        setTimeout(() => {
          this.getAllCourseData();
        },
        3000);
      }
    );
  }
  
}
