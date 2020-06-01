import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, AUTHENTICATED_USER, PASSWORD } from '../app.constants';
import { map } from 'rxjs/operators';

interface GoogleUserObject {
  authToken: string;
  email: string;
  firstName: string;
  id: string;
  idToken: string;
  lastName: string;
  name: string;
  photoUrl: string;
  provider: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterGoogleUsersService {

  constructor(private http: HttpClient) { }

  executeGoogleSignIn(userObject: GoogleUserObject) {
    return this.http.post<any>(`${API_URL}/authenticate-google-user`, {
      id: userObject.id,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
      photoUrl: userObject.photoUrl,
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, userObject.id);
          sessionStorage.setItem(PASSWORD, userObject.idToken);
        }
      )
    );
  }
}
