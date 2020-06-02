import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AUTHENTICATED_USER } from '../app.constants';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  updateForm: FormGroup;
  course: any;
  user: any;
  courseId: number;
  creatorId: string;
  authenticatedUser: string;
  success: boolean = false;
  failure: boolean = false;

  constructor(private courseService: CourseDataService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.authenticatedUser = sessionStorage.getItem(AUTHENTICATED_USER);
    this.courseId = Number(this.route.snapshot.paramMap.get("id"));

    // get course and instructor data
    this.getCourseData();
    this.getUserData();

    // form validations
    this.updateForm = this.fb.group({
      'courseTitle': new FormControl('', Validators.required),
      'courseDescription': new FormControl('', Validators.required),
      'skillsAcquired': new FormControl('', Validators.required)
    });
  }

  getCourseData() {
    this.courseService.getCourseDetails(this.courseId).subscribe(
      data => {
        this.course = data;
        this.creatorId = this.course.creatorId;
        this.updateForm.get('courseTitle').setValue(this.course.courseTitle);
        this.updateForm.get('courseDescription').setValue(this.course.courseDescription);
        this.updateForm.get('skillsAcquired').setValue(this.course.skillsAcquired);
        this.getUserData();
      }
    );
  }

  getUserData() {
    this.courseService.getUserDetails(this.creatorId).subscribe(
      data => this.user = data
    );
  }

  handleCourseUpdation() {
    this.success = false;
    this.failure = false;
    let courseTitle = this.updateForm.get('courseTitle').value;
    let courseDescription = this.updateForm.get('courseDescription').value;
    let skillsAcquired = this.updateForm.get('skillsAcquired').value;

    this.courseService.updateCourseDetails(this.course, courseTitle, courseDescription, skillsAcquired)
      .subscribe(
        data => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['home']);
          },
          3500);
        },
        error => this.failure = true
      );
  }

}
