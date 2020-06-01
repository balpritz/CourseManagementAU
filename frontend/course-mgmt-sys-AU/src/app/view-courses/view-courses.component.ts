import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  courseList: any;
  users: any;

  constructor(private courseService: CourseDataService) { }

  ngOnInit(): void {
    this.getUserData();
    this.populateCourseData();
  }

  populateCourseData(){
    this.courseService.getAllCourseDetails().subscribe(
      data => this.courseList = data
    );
  }
  
  getUserData() {
    this.courseService.getAllUserDetails().subscribe(
      data => this.users = data
    );
  }
}
