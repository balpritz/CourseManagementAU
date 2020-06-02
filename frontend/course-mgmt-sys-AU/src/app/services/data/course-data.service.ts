import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, AUTHENTICATED_USER } from '../../app.constants';

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

  getAllCourseDetails() {
    return this.http.get(`${API_URL}/get/courses`);
  }

  getAllUserDetails() {
    return this.http.get(`${API_URL}/get/users`);
  }

  getUserDetails(id: string) {
    return this.http.get(`${API_URL}/get/users/${id}`);
  }

  getCourseDetails(id: number) {
    return this.http.get(`${API_URL}/get/courses/${id}`);
  }

  deleteCourse(courseId: number) {
    return this.http.delete(`${API_URL}/delete/courses/${courseId}`);
  }
}
