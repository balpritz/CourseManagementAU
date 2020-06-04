import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, AUTHENTICATED_USER } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(private http: HttpClient) { }

  createNewCourse(courseTitle: string, courseDescription: string, skillsAcquired: string, githubRepoLink: string) {
    let date = new Date().toISOString().slice(0,10);

    return this.http.post<any>(`${API_URL}/add-new-course`, {
      courseTitle,
      courseDescription,
      creatorId: sessionStorage.getItem(AUTHENTICATED_USER),
      skillsAcquired,
      githubRepoLink,
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

  updateCourseDetails(course: any, courseTitle: string, courseDescription: string, skillsAcquired: string, githubRepoLink: string) {
    let date = new Date().toISOString().slice(0,10);

    return this.http.put<any>(`${API_URL}/update/courses/${course.courseId}`, {
      courseId: course.courseId,
      courseTitle,
      courseDescription,
      creatorId: course.creatorId,
      skillsAcquired,
      githubRepoLink,
      isCourseActive: course.isCourseActive,
      courseCreationDate: course.courseCreationDate,
      lastUpdated: date,
    });
  }

  updateCourseStatus(course: any, status: boolean) {
    let date = new Date().toISOString().slice(0,10);

    return this.http.put<any>(`${API_URL}/update/courses/${course.courseId}`, {
      courseId: course.courseId,
      courseTitle: course.courseTitle,
      courseDescription: course.courseDescription,
      creatorId: course.creatorId,
      skillsAcquired: course.skillsAcquired,
      githubRepoLink: course.githubRepoLink,
      isCourseActive: !status,
      courseCreationDate: course.courseCreationDate,
      lastUpdated: date,
    });
  }

  getSearchResults(query: string) {
    return this.http.get<any>(`${API_URL}/search/courses?keyword=${query}`);
  }

  retrieveEnrollmentStatus(userId: string, courseId: number) {
    return this.http.post<any>(`${API_URL}/get/enrollment-status`, {
      userId,
      courseId
    });
  }

  enrollUserForACourse(userId: string, courseId: number) {
    return this.http.put<any>(`${API_URL}/enroll/user`, {
      userId,
      courseId
    });
  }

  retrieveEnrollmentData(courseId: number) {
    return this.http.get<any>(`${API_URL}/get/enrollment-data/courses/${courseId}`);
  }

  provideFeedback(userId: string, courseId: number, data: string, rating: number) {
    return this.http.put<any>(`${API_URL}/add/feedback?data=${data}&rating=${rating}`, {
      userId,
      courseId
    });
  }
}
