import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CourseDataService } from '../services/data/course-data.service';
import { ActivatedRoute } from '@angular/router';
import { AUTHENTICATED_USER } from '../app.constants';

@Component({
  selector: 'app-course-mainpage',
  templateUrl: './course-mainpage.component.html',
  styleUrls: ['./course-mainpage.component.css']
})
export class CourseMainpageComponent implements OnInit {

  courseId: number;
  creatorId: string;
  courseData: any;
  creatorData: any;
  loggedInUserId: string;
  feedbackCount: number;
  enrollmentData: any;
  enrolledTraineeCount: number;
  skills: string[];
  isEnrolled: boolean;
  feedbackStatus: boolean;
  averageCourseRating: number;
  feedbackForm: FormGroup;

  constructor(private courseService: CourseDataService, 
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get("id"));
    this.loggedInUserId = sessionStorage.getItem(AUTHENTICATED_USER);

    this.feedbackForm = this.fb.group({
      'fbdata': new FormControl('', Validators.required),
      'rating': new FormControl('', Validators.required)
    });
    
    // get course and instructor data
    this.getCourseData();

    // get enrollment status for logged user
    this.getEnrollementStatus();

    // get feedback data
    this.getCourseEnrollmentData();
  }

  getCourseData(){
    this.courseService.getCourseDetails(this.courseId).subscribe(
      data => {
        if(data == null) { 
          this.creatorId = 'NO_CONTENT';
          return; 
        }

        this.courseData = data;
        this.skills = this.courseData.skillsAcquired.split(';');
        this.creatorId = this.courseData.creatorId;
        this.getCreatorData();
      }
    );
  }
  
  getCreatorData() {
    this.courseService.getUserDetails(this.creatorId).subscribe(
      data => this.creatorData = data
    );
  }

  getEnrollementStatus() {
    this.courseService.retrieveEnrollmentStatus(this.loggedInUserId, this.courseId).subscribe(
      response => this.isEnrolled = response
    );
  }

  enrollUser() {
    this.courseService.enrollUserForACourse(this.loggedInUserId, this.courseId).subscribe(
      response => this.isEnrolled = true
    );
  }

  getCourseEnrollmentData() {
    this.courseService.retrieveCourseEnrollementData(this.courseId).subscribe(
      data => {
        this.enrollmentData = data;
        this.enrolledTraineeCount = data.length;
        this.calculateAverageRatings();
      }
    );
  }

  handlefeedbackSubmission() {
    let data = this.feedbackForm.get('fbdata').value;
    let rating = this.feedbackForm.get('rating').value;

    this.courseService.provideFeedback(this.loggedInUserId, this.courseId, data, rating).subscribe(
      response => {
        this.getCourseEnrollmentData();
      }
    );
  }

  calculateAverageRatings() {
    let total: number = 0;
    let count: number = 0;

    for(let i = 0; i < this.enrollmentData.length; i++) {
      if(this.enrollmentData[i].feedback) {
        total += this.enrollmentData[i].rating;
        count++;
      }

      if(this.enrollmentData[i].id.userId == this.loggedInUserId) {
        this.feedbackStatus = this.enrollmentData[i].feedback ? true: false;
      }
    }

    this.feedbackCount = count;
    this.averageCourseRating = this.enrollmentData.length && count ? total / count : 0;
  }

}
