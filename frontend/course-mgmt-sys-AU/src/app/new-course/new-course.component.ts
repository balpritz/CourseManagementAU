import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CourseDataService } from '../services/data/course-data.service';
import { Router } from '@angular/router';
import * as isGithubUrl from 'is-github-url';

function isValidGithubLink(input: FormControl) {
  const result = isGithubUrl(`${input.value}`, { repository: true });
  return result ? null : { invalidLink: true };
}

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

  // github link validation
  githubRepoLink = new FormControl('', [Validators.required, isValidGithubLink]);

  constructor(private fb: FormBuilder, 
    private courseService: CourseDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.newCourseForm = this.fb.group({
      'courseTitle': new FormControl('', Validators.required),
      'courseDescription': new FormControl('', Validators.required),
      'skillsAcquired': new FormControl('', Validators.required),
      'githubRepoLink': this.githubRepoLink
    });
  }

  handleNewCourseAddition() {
    this.success = false;
    this.failure = false;
    this.courseTitle = this.newCourseForm.get('courseTitle').value;
    this.courseDescription = this.newCourseForm.get('courseDescription').value;
    this.skillsAcquired = this.newCourseForm.get('skillsAcquired').value;
    let githubLink: string = this.newCourseForm.get('githubRepoLink').value;

    this.courseService.createNewCourse(this.courseTitle, this.courseDescription, this.skillsAcquired, githubLink)
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
