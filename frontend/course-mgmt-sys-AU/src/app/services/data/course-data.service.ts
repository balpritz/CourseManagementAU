import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, AUTHENTICATED_USER } from '../../app.constants';

interface CourseDetails {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  creatorId: string;
  skillsAcquired: string;
  isCourseActive: boolean;
  courseCreationDate: Date;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(private http: HttpClient) { }

  createNewCourse(courseTitle: string, courseDescription: string, skillsAcquired: string) {
    
    let date = new Date().toISOString().slice(0,10);

    return this.http.post<any>(`${API_URL}/add-new-course`, {
      courseTitle,
      courseDescription,
      creatorId: sessionStorage.getItem(AUTHENTICATED_USER),
      skillsAcquired,
      isCourseActive: true,
      courseCreationDate: date,
      lastUpdated: date,
    });
  }
}
