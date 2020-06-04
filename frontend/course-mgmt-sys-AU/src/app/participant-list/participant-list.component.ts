import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';
import { ActivatedRoute } from '@angular/router';
import { AUTHENTICATED_USER } from '../app.constants';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  courseId: number;
  courseData: any;
  enrollmentData: any;
  creatorId: string;
  loggedInUserId: string;

  constructor(private courseService: CourseDataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get("id"));
    this.loggedInUserId = sessionStorage.getItem(AUTHENTICATED_USER);

    // get course data
    this.getCourseData();
  }

  getCourseData() {
    this.courseService.getCourseDetails(this.courseId).subscribe(
      data => {
        if(data != null) {
          this.courseData = data;
          this.creatorId = this.courseData.creatorId;
          this.getCourseEnrollmentData();
        } else { this.creatorId = 'NO_CONTENT'; }
      }
    );
  }

  getCourseEnrollmentData() {
    this.courseService.retrieveCourseEnrollementData(this.courseId).subscribe(
      data => this.enrollmentData = data
    );
  }

}
