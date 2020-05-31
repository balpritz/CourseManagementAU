import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';
import { map } from 'rxjs/operators';

const AUTHENTICATED_USER = 'authenticaterUser';
const PASSWORD = 'password';

@Injectable({
  providedIn: 'root'
})
export class AutheticateLoginService {

  constructor(private http: HttpClient) { }

  executeLoginAuthentication(email: string, password: string) {
    return this.http.post<any>(`${API_URL}/authenticate`, {
      email,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, email);
          sessionStorage.setItem(PASSWORD, password);
        }
      )
    );
  }
}
