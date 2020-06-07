import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Notice } from '../class/Notice';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'php/';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! Něco se pokazilo.');
  }

  getNotices(): Observable<Notice[]> {
    let notices: Notice[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}noticeboard_get.php`).pipe(
      map((res) => {
        notices = res[data];
        return notices;
      }), catchError(this.handleError));
  }
}
