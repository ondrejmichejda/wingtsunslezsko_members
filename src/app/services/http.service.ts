import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
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

  /**************************
   **** POST REQUESTS
   **************************/

  /**
   * Verify user login.
   */
  getMember_post(login: string, password: string): Observable<WTMember[]>{
    let member: WTMember[];
    const data = 'data';
    const body = new HttpParams()
      .set('login', login.toString())
      .set('p', password.toString());
    return this.http.post(`${this.baseUrl}member_get.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe( map((res) => {
        member = res[data];
        return member;
      }), catchError(this.handleError));
  }

  /**
   * Update event.
   */
  setEvent_post(event: WTEvent){
    const body = new HttpParams()
      .set('id', event.id.toString())
      .set('name', event.name.toString())
      .set('school', event.school.toString())
      .set('location', event.location.toString())
      .set('prize', event.prize.toString())
      .set('description', event.description.toString())
      .set('memberlimit', event.memberlimit.toString())
      .set('memberlimitMin', event.memberlimitMin.toString())
      .set('datetimeStart', event.datetimeStart.toString())
      .set('datetimeEnd', event.datetimeEnd.toString())
      .set('datetimeDeadline', event.datetimeDeadline.toString());

    return this.http.post(`${this.baseUrl}event_set.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Copy event by id.
   */
  copyEvent_post(id: number){
    const body = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl}event_copy.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Delete event by id.
   */
  deleteEvent_post(id: number){
    const body = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl}event_delete.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**************************
   **** GET REQUESTS
   **************************/

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
   * Get all events from db. Admin purposes.
   */
  getEventsAll(): Observable<WTEvent[]> {
    let events: WTEvent[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}eventsall_get.php`).pipe(
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
