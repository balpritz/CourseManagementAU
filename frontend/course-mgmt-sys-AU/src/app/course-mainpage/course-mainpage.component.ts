import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';
import { ActivatedRoute } from '@angular/router';
import { CREATOR_ID } from '../app.constants';

@Component({
  selector: 'app-course-mainpage',
  templateUrl: './course-mainpage.component.html',
  styleUrls: ['./course-mainpage.component.css']
})
export class CourseMainpageComponent implements OnInit {

  courseId: number;
  creatorId: string;
  courseData: any;
  userData: any;
  skills: string[];

  constructor(private courseService: CourseDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get("id"));
    if(history.state.data) {
      this.creatorId = history.state.data.creatorId;
      sessionStorage.setItem(CREATOR_ID, history.state.data.creatorId);
    } else {
      this.creatorId = sessionStorage.getItem(CREATOR_ID);
    }
    
    // get course and instructor data
    this.getUserData();
    this.getCourseData();
  }

  getCourseData(){
    this.courseService.getCourseDetails(this.courseId).subscribe(
      data => {
        this.courseData = data;
        this.skills = this.courseData.skillsAcquired.split(';');
      }
    );
  }
  
  getUserData() {
    this.courseService.getUserDetails(this.creatorId).subscribe(
      data => this.userData = data
    );
  }
}
