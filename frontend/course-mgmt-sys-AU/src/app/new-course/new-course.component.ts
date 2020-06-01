import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CourseDataService } from '../services/data/course-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  newCourseForm: FormGroup;
  courseTitle: string;
  courseDescription: string;
  skillsAcquired: string;
  success: boolean = false;
  failure: boolean = false;

  constructor(private fb: FormBuilder, 
    private courseService: CourseDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.newCourseForm = this.fb.group({
      'courseTitle': new FormControl('', Validators.required),
      'courseDescription': new FormControl('', Validators.required),
      'skillsAcquired': new FormControl('', Validators.required)
    });
  }

  handleNewCourseAddition() {
    this.success = false;
    this.failure = false;
    this.courseTitle = this.newCourseForm.get('courseTitle').value;
    this.courseDescription = this.newCourseForm.get('courseDescription').value;
    this.skillsAcquired = this.newCourseForm.get('skillsAcquired').value;

    this.courseService.createNewCourse(this.courseTitle, this.courseDescription, this.skillsAcquired)
      .subscribe(
        data => {
          console.log(data);
          this.success = true;
          this.router.navigate(['home']);
        },
        error => this.failure = true
      );
  }

}
