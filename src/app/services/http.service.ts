import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WTNotice } from '../class/data/WTNotice';
import { WTEvent } from '../class/data/WTEvent';
import { WTMember } from '../class/data/WTMember';
import {WTEventRegistration} from '../class/data/WTEventRegistration';
import {WTMembersOnEvent} from '../class/data/WTMembersOnEvent';
import {WTArticle} from '../class/data/WTArticle';
import {WTImage} from '../class/data/WTImage';
import {WTVideo} from '../class/data/WTVideo';
import {WTLog} from '../class/data/WTLog';
import {WTLogExt} from '../class/data/WTLogExt';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'php/';
  pictureUrl = '../temp/'

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
   * Create event.
   */
  createEvent_post(){
    return this.http.post(`${this.baseUrl}event_create.php`, null, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Delete member.
   */
  deleteMember_post(member: WTMember){
    const body = new HttpParams()
      .set('id', member.id.toString());

    return this.http.post(`${this.baseUrl}member_delete.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update member's password.
   */
  updatePwdMember_post(member: WTMember){
    const body = new HttpParams()
      .set('id', member.id.toString())
      .set('pwd', member.pwd.toString());

    return this.http.post(`${this.baseUrl}member_updatepwd.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update member's logged datetime.
   */
  updateMemberLogged_post(member: WTMember){
    const body = new HttpParams()
      .set('id', member.id.toString());

    return this.http.post(`${this.baseUrl}member_updatelogged.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update member's password.
   */
  updateMember_post(member: WTMember){
    const body = new HttpParams()
      .set('id', member.id.toString())
      .set('name', member.name.toString())
      .set('surname', member.surname.toString())
      .set('login', member.login.toString())
      .set('school', member.school.toString());

    return this.http.post(`${this.baseUrl}member_update.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Create member.
   */
  createMember_post(member: WTMember){
    const body = new HttpParams()
      .set('name', member.name.toString())
      .set('surname', member.surname.toString())
      .set('school', member.school.toString())
      .set('login', member.login.toString())
      .set('pwd', member.pwd.toString());

    return this.http.post(`${this.baseUrl}member_create.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Send mail after create member.
   */
  sendMail_post(mail: string, text: string){
    const body = new HttpParams()
      .set('mail', mail.toString())
      .set('text', text.toString());

    return this.http.post(`${this.baseUrl}member_sendmail.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * File upload pic.
   */
  postFilePic(fileToUpload: File, articleId: number){
    const endpoint = `${this.baseUrl}file_upload_pic.php`;
    const formData: FormData = new FormData();

    const headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    formData.append('file', fileToUpload, articleId.toString());
    return this.http.post(endpoint, formData, { headers});
  }

  /**
   * File upload gallery.
   */
  postFileGallery(fileToUpload: File, articleId: number){
    const endpoint = `${this.baseUrl}file_upload_gallery.php`;
    const formData: FormData = new FormData();

    const headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    formData.append('file', fileToUpload, articleId.toString() + ':' + fileToUpload.name);
    return this.http.post(endpoint, formData, { headers});
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
      .set('datetimeDeadline', event.datetimeDeadline.toString())
      .set('autoconfirm', event.autoconfirm.toString())
      .set('visible', event.visible.toString());

    return this.http.post(`${this.baseUrl}event_set.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update article.
   */
  setArticle_post(article: WTArticle){
    const body = new HttpParams()
      .set('id', article.id.toString())
      .set('topic', article.topic.toString())
      .set('url', article.url.toString())
      .set('keywords', article.keywords.toString())
      .set('metadesc', article.metadesc.toString())
      .set('name', article.name.toString())
      .set('short', article.short.toString())
      .set('pic', article.pic.toString())
      .set('text', article.text.toString())
      .set('releaseDatetime', article.releaseDatetime.toString());

    return this.http.post(`${this.baseUrl}article_set.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Create notice.
   */
  createNotice_post(notice: WTNotice){
    const body = new HttpParams()
      .set('head', notice.head.toString())
      .set('school', notice.school.toString())
      .set('color', notice.color.toString())
      .set('text', notice.text.toString());

    return this.http.post(`${this.baseUrl}notice_create.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Create article.
   */
  createArticle_post(){
    return this.http.post(`${this.baseUrl}article_create.php`, null, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Create video.
   */
  createVideo(){
    return this.http.post(`${this.baseUrl}video_create.php`, null, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Delete notice.
   */
  deleteNotice_post(id: number){
    const body = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl}notice_delete.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update visible notice.
   */
  updateVisibleNotice_post(id: number, visible: boolean){
    const body = new HttpParams()
      .set('id', id.toString())
      .set('visible', visible.toString());
    return this.http.post(`${this.baseUrl}notice_update_visible.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update visible article.
   */
  updateVisibleArticle_post(id: number, visible: boolean){
    const body = new HttpParams()
      .set('id', id.toString())
      .set('visible', visible.toString());
    return this.http.post(`${this.baseUrl}article_update_visible.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update visible image.
   */
  updateVisibleArticlePic_post(id: number, visible: boolean){
    const body = new HttpParams()
      .set('id', id.toString())
      .set('visible', visible.toString());
    return this.http.post(`${this.baseUrl}articleimage_update_visible.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Delete article.
   */
  deleteArticle_post(id: number){
    const body = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl}article_delete.php`, body.toString(), {
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
   * Reset all on event
   */
  eventResetAll_post(eventId: number){
    const body = new HttpParams()
      .set('eventId', eventId.toString());
    return this.http.post(`${this.baseUrl}event_registration_reset_all.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Confirm all on event
   */
  eventConfirmedAll_post(eventId: number){
    const body = new HttpParams()
      .set('eventId', eventId.toString());
    return this.http.post(`${this.baseUrl}event_registration_confirmed_all.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Present all on event
   */
  eventPresentAll_post(eventId: number){
    const body = new HttpParams()
      .set('eventId', eventId.toString());
    return this.http.post(`${this.baseUrl}event_registration_present_all.php`, body.toString(), {
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

  /**
   * Delete video by id.
   */
  deleteVideo(video: WTVideo){
    const body = new HttpParams()
      .set('id', video.id.toString());

    return this.http.post(`${this.baseUrl}video_delete.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update event registration.
   */
  updateRegistration_post(id: number, confirmed: boolean, present: boolean, eventId: number){
    const body = new HttpParams()
      .set('id', id.toString())
      .set('confirmed', confirmed.toString())
      .set('present', present.toString())
      .set('eventId', eventId.toString());

    return this.http.post(`${this.baseUrl}event_registration_update.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Delete event registration.
   */
  deleteRegistration_post(id: number, eventId: number){
    const body = new HttpParams()
      .set('id', id.toString())
      .set('eventId', eventId.toString());

    return this.http.post(`${this.baseUrl}event_registration_delete.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Create log record.
   */
  createLog_post(log: WTLog){
    const body = new HttpParams()
      .set('user', log.user.toString())
      .set('type', log.type.toString())
      .set('role', log.role.toString())
      .set('section', log.section.toString())
      .set('city', log.city.toString())
      .set('info1', log.info1.toString())
      .set('info2', log.info2.toString());

    return this.http.post(`${this.baseUrl}log_create.php`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Sign in member to event
   */
  signIn(eventId: number, userId: number, confirmed: boolean) {
    const body = new HttpParams()
      .set('eventId', eventId.toString())
      .set('userId', userId.toString())
      .set('confirmed', confirmed.toString());

    return this.http.post(`${this.baseUrl}sign_in.php`, body.toString(),{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  /**
   * Update video.
   */
  updateVideo(video: WTVideo) {
    const body = new HttpParams()
      .set('id', video.id.toString())
      .set('name', video.name.toString())
      .set('category', video.category.toString())
      .set('description', video.description.toString())
      .set('link', video.link.toString())
      .set('visible', video.visible.toString());

    return this.http.post(`${this.baseUrl}video_update.php`, body.toString(),{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
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
   * Get logs.
   */
  getLogs(): Observable<WTLogExt[]> {
    let logs: WTLogExt[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}log_get.php`).pipe(
      map((res) => {
        logs = res[data];
        return logs;
      }), catchError(this.handleError));
  }

  /**
   * Get articles from db.
   */
  getArticles(): Observable<WTArticle[]> {
    let articles: WTArticle[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}article_get_all.php`).pipe(
      map((res) => {
        articles = res[data];
        return articles;
      }), catchError(this.handleError));
  }

  /**
   * Get videos from db.
   */
  getVideos(): Observable<WTVideo[]> {
    let videos: WTVideo[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}video_get.php`).pipe(
      map((res) => {
        videos = res[data];
        return videos;
      }), catchError(this.handleError));
  }

  /**
   * Get all videos from db.
   */
  getVideosAll(): Observable<WTVideo[]> {
    let videos: WTVideo[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}video_get_all.php`).pipe(
      map((res) => {
        videos = res[data];
        return videos;
      }), catchError(this.handleError));
  }

  /**
   * Get members from db.
   */
  getMembers(): Observable<WTMember[]> {
    let members: WTMember[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}member_get_all.php`).pipe(
      map((res) => {
        members = res[data];
        return members;
      }), catchError(this.handleError));
  }

  /**
   * Get article images from db.
   */
  getArticleImages(id: number): Observable<WTImage[]> {
    let images: WTImage[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}articleimage_get.php?id=`+id).pipe(
      map((res) => {
        images = res[data];
        return images;
      }), catchError(this.handleError));
  }

  /**
   * Get notices from db.
   */
  getNotices(school: number): Observable<WTNotice[]> {
    let notices: WTNotice[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}notice_get.php?school=`+school).pipe(
      map((res) => {
        notices = res[data];
        return notices;
      }), catchError(this.handleError));
  }

  /**
   * Get all notices from db.
   */
  getNoticesAll(): Observable<WTNotice[]> {
    let notices: WTNotice[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}noticeall_get.php`).pipe(
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
   * Get event from db.
   */
  getEvent(id: number): Observable<WTEvent[]> {
    let events: WTEvent[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}event_get.php?eventId=`+id).pipe(
      map((res) => {
        events = res[data];
        return events;
      }), catchError(this.handleError));
  }

  /**
   * Get members on event from db.
   */
  getMembersOnEvent(eventId: number): Observable<WTMembersOnEvent[]> {
    let members: WTMembersOnEvent[];
    const data = 'data';
    return this.http.get(`${this.baseUrl}members_on_event_get.php?eventId=`+eventId).pipe(
      map((res) => {
        members = res[data];
        return members;
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
