import { Injectable } from '@angular/core';
import { AppConfig } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable()
export class DataService {
  ourBaseUrl: string;

  constructor(private http: HttpClient) {
    this.ourBaseUrl = AppConfig.baseUrl;
  }

  getMyAccount<T>(): Observable<T> {
    return this.http.post<T>(`${this.ourBaseUrl}/banks/me`, '');
  }

  getATMs<T>(
    pollInterval: number = 5000,
    url: string = `${this.ourBaseUrl}/banks/me/atms`
  ): Observable<Array<T>> {
    return interval(pollInterval).pipe(
      startWith(0),
      switchMap(() => this.http.get<Array<T>>(url))
    );
  }

  getManagers<T>(pollInterval?: number | 3000): Observable<Array<T>> {
    return interval(pollInterval).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get<Array<T>>(`${this.ourBaseUrl}/banks/me/managers`)
      )
    );
  }
}
