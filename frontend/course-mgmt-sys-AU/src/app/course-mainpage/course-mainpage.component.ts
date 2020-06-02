import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';
import { ActivatedRoute } from '@angular/router';

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
    
    // get course and instructor data
    this.getCourseData();
    this.getUserData();
  }

  getCourseData(){
    this.courseService.getCourseDetails(this.courseId).subscribe(
      data => {
        this.courseData = data;
        this.skills = this.courseData.skillsAcquired.split(';');
        this.creatorId = this.courseData.creatorId;
        this.getUserData();
      }
    );
  }
  
  getUserData() {
    this.courseService.getUserDetails(this.creatorId).subscribe(
      data => this.userData = data
    );
  }
}
