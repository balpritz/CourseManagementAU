import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  newCourseForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newCourseForm = this.fb.group({
      'courseTitle': new FormControl('', Validators.required),
      'courseDescription': new FormControl('', Validators.required),
      'skillsAcquired': new FormControl('', Validators.required)
    });
  }

  handleNewCourseAddition() {

  }

}
