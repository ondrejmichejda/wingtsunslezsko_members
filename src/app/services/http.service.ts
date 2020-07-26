import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WTNotice } from '../class/WTNotice';
import { WTEvent } from '../class/WTEvent';
import { WTMember } from '../class/WTMember';
import {WTEventRegistration} from '../class/WTEventRegistration';

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
  getMember(login: string, password: string): Observable<WTMember[]> {
    let member: WTMember[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}member_get.php?login=`+login + `&p=` + password).pipe(
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
  getEvents(school: number): Observable<WTEvent[]> {
    let events: WTEvent[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}events_get.php?school=`+school).pipe(
      map((res) => {
        events = res[data];
        return events;
      }), catchError(this.handleError));
  }

  /**
   * Sign in member to event
   */
  signIn(eventId: number, userId: number): Observable<boolean> {
    let result: boolean;
    return this.http.get(`${this.baseUrl}sign_in.php?eventId=`+eventId+`&userId=`+userId).pipe(
      map((res) => {
        result = Boolean(res);
        return result;
      }), catchError(this.handleError));
  }

  /**
   * Sign out member from event
   */
  signOut(eventId: number, userId: number): Observable<boolean> {
    let result: boolean;
    return this.http.get(`${this.baseUrl}sign_out.php?eventId=`+eventId+`&userId=`+userId).pipe(
      map((res) => {
        result = Boolean(res);
        return result;
      }), catchError(this.handleError));
  }

  /**
   * Get events registrations from db.
   */
  getEventsRegistrations(id: number, byMember: boolean): Observable<WTEventRegistration[]> {
    let eventsRegs: WTEventRegistration[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}events_registration_get.php?id=`+id+`&byMember=`+byMember).pipe(
      map((res) => {
        eventsRegs = res[data];
        return eventsRegs;
      }), catchError(this.handleError));
  }
}
