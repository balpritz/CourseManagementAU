import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDataService } from '../services/data/course-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  query: string = '';
  queryObj: any;
  courseList: any;
  users: any;

  constructor(private route: ActivatedRoute,
    private courseService: CourseDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.route.queryParamMap.subscribe(params => {
      this.queryObj = {...params.keys, ...params};
      this.query = this.queryObj.params.query;
    });

    // retrieve search results
    this.getUsersData();
    this.getCourseDataBasedOnSearchQuery();
  }

  getCourseDataBasedOnSearchQuery() {
    this.courseService.getSearchResults(this.query).subscribe(
      data => this.courseList = data
    );
  }
  
  getUsersData() {
    this.courseService.getAllUserDetails().subscribe(
      data => this.users = data
    );
  }

}
