import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WTNotice } from '../class/WTNotice';
import { WTEvent } from '../class/WTEvent';
import { WTMember } from '../class/WTMember';

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

  /**
   * Verify user login.
   */
  getMember(login: string): Observable<WTMember[]> {
    let member: WTMember[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}member_get.php?login=`+login).pipe(
      map((res) => {
        member = res[data];
        return member;
      }), catchError(this.handleError));
  }

  /**
   * Get notices from db.
   */
  getNotices(): Observable<WTNotice[]> {
    let notices: WTNotice[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}noticeboard_get.php`).pipe(
      map((res) => {
        notices = res[data];
        return notices;
      }), catchError(this.handleError));
  }

  /**
   * Get events from db.
   */
  getEvents(): Observable<WTEvent[]> {
    let events: WTEvent[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}events_get.php`).pipe(
      map((res) => {
        events = res[data];
        return events;
      }), catchError(this.handleError));
  }
}
