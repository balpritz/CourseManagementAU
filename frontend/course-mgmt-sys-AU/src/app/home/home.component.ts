import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/data/course-data.service';
import { AUTHENTICATED_USER } from '../app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: string;
  userData: any;
  welcomeMessage: string = 'In your absence, you were missed. Now that you have returned, though, things they are alright.';

  constructor(private courseService: CourseDataService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem(AUTHENTICATED_USER);

    this.retrieveUserDetails();
  }

  retrieveUserDetails() {
    this.courseService.getUserDetails(this.userId).subscribe(
      data => this.userData = data
    );
  }

}
