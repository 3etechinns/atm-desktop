import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppConfig} from '../../environments/environment';
import {AuthResponse} from '../app.models';

@Injectable()
export class AuthService {

  ourBaseUrl: string;

  constructor(private http: HttpClient) {
    this.ourBaseUrl = AppConfig.baseUrl;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.ourBaseUrl}/banks/login`, {email, password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return result;
        })
      );
  }
}
