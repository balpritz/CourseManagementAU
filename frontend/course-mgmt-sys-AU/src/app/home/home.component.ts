import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';
import { AUTHENTICATED_USER } from '../app.constants';

var courseStats = [
  {
    "name": "Active Courses",
    "value": -1
  },
  {
    "name": "Inactive Courses",
    "value": -1
  },
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  view: any = [700, 200];
  gradient: boolean = false;
  courseStats: any[];
  courseCreated: number;
  enrollmentCount: number;

  // color scheme
  colorScheme = {
    domain: ['#1767b1', 'black']
  };
  
  userId: string;
  userData: any;
  welcomeMessage: string = 'In your absence, you were missed. Now that you have returned, though, things they are alright.';

  constructor(private courseService: CourseDataService) {
    Object.assign(this, { courseStats });
  } 

  ngOnInit(): void {
    this.userId = sessionStorage.getItem(AUTHENTICATED_USER);

    this.retrieveUserDetails();
    this.getUserEnrollmentData();
  }

  retrieveUserDetails() {
    this.courseService.getUserDetails(this.userId).subscribe(
      data => {
        this.userData = data;
        this.getGlobalStats();
      }
    );
  }

  getGlobalStats() {
    this.courseService.getAllCourseDetails().subscribe(
      data => this.computeStatistics(data)
    );
  }

  getUserEnrollmentData() {
    let loggedInUserId: string = sessionStorage.getItem(AUTHENTICATED_USER);

    this.courseService.retrieveUserEnrollmentData(loggedInUserId).subscribe(
      data => {
        if(data != null) {
          this.enrollmentCount = data.length;
        } else { this.enrollmentCount = 0; }
      }
    );
  }

  computeStatistics(courseData: any) {
    let inactive: number = 0;
    let active: number = 0;
    let courseCreatedCount: number = 0;
    let loggedInUserId: string = sessionStorage.getItem(AUTHENTICATED_USER);

    for(let i = 0; i < courseData.length; i++) {
      if(courseData[i].isCourseActive) {
        active++; 
      } else { inactive++; }

      if(courseData[i].creatorId == loggedInUserId) {
        courseCreatedCount++;
      }
    }

    courseStats[0].value = active;
    courseStats[1].value = inactive;
    this.courseCreated = courseCreatedCount;
  }
}
