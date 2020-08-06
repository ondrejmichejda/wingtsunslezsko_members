import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpService} from '../services/http.service';
import {WTEvent} from '../class/data/WTEvent';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {AlertService} from '../services/alert.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {Convert} from '../class/Convert';
import {DeviceService} from '../services/device.service';
import {WTMembersOnEvent} from '../class/data/WTMembersOnEvent';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {HeaderService} from '../services/header-title-change.service';
import {WTNotice} from '../class/data/WTNotice';

@Component({
  selector: 'app-page-adminevents',
  templateUrl: './page-adminevents.component.html',
  styleUrls: ['./page-adminevents.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PageAdmineventsComponent implements OnInit {
  dataSource;
  dataSourceMembers;
  columnsToDisplay = this.device.IsMobile() ? ['name', 'control'] : ['id', 'name', 'datetimeStart', 'control'];
  columnsToDisplayMembers = this.device.IsMobile() ? ['surname', 'status', 'control'] :
    ['name', 'surname', 'datetime', 'status', 'control'];
  expandedElement: WTEvent | null;
  @ViewChild('eventSort', {static: true}) eventSort: MatSort;

  history: boolean;

  events: WTEvent[];
  event: WTEvent;
  members: WTMembersOnEvent[];
  curEventId: number;

  error = '';
  membersError = '';

  editor: Editor;

  constructor(private httpService: HttpService,
              private alertService: AlertService,
              private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              public device: DeviceService,
              private headerService: HeaderService){
    this.editor = new Editor();
    this.history = false;
    this.headerService.setTitle('Správa událostí');
  }

  ngOnInit() {
    this.getEvents();
  }

  formatDate(d: string): Date{
    return Convert.sqlToJsDate(d);
  }

  historyChange(){
    this.refresh();
  }

  dialogDelete(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteEvent(id);
      }
    });
  }

  dialogResetAll(eventId: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu všechny potvrdit?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._resetAll(eventId);
      }
    });
  }

  dialogConfirmAll(eventId: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu všechny potvrdit?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._confirmedAll(eventId);
      }
    });
  }

  dialogPresentAll(eventId: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu všichni dorazili?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._presentAll(eventId);
      }
    });
  }

  getEvents(): void {
    this.httpService.getEventsAll().subscribe(
      (events: WTEvent[]) => {
        if(this.history){
          this.events = events;
        }
        else{
          this.events = events.filter(
            ev => this.formatDate(ev.datetimeEnd) >= new Date());
          }
        this.dataSource = new MatTableDataSource(this.events);
        this.dataSource.sort = this.eventSort;
        this.event = this.events[0];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getMembers(eventId: number): void {
    this.httpService.getMembersOnEvent(eventId).subscribe(
      (members: WTMembersOnEvent[]) => {
        this.members = members;
        this.dataSourceMembers = new MatTableDataSource(this.members);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getEvent(eventId: number): void {
    this.httpService.getEvent(eventId).subscribe(
      (events: WTEvent[]) => {
        this.event = events[0];
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  createEvent(){
    this.httpService.createEvent_post().subscribe(
      (res: boolean) => {
        this.alertService.alert(AlertTexts.event_created, SnackType.info);
        this.getEvents();
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  getName(member: WTMembersOnEvent): string{
    return member.name ?? member.guestName;
  }

  getSurname(member: WTMembersOnEvent): string{
    return member.surname ?? member.guestSurname;
  }

  getStatus(member: WTMembersOnEvent): string{
    let result = '';
    if(!!+member.confirmed)
      result = 'done';
    if(!!+member.present)
      result = 'done_all';
    return result;
  }

  tabChanged(ev: MatTabChangeEvent, event: WTEvent){
    if(ev.index === 1){
      this.getMembers(event.id);
      this.curEventId = event.id;
    }
    else{
      this.dataSourceMembers.sort = null;
    }
  }

  changeVisibility(event: WTEvent){
    event.visible = !!!+event.visible;
    this.updateEvent(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateEvent(event: WTEvent) {
    this.httpService.setEvent_post(event).subscribe(data => {
      this.alertService.alert(AlertTexts.event_udpated, SnackType.info);
      this.editor.ResetAll();
      this.editor.shadowCopyEvent();
      this.refresh();
    },Error => {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  copyEvent(id: number) {
    this.httpService.copyEvent_post(id).subscribe(data => {
      this.alertService.alert(AlertTexts.event_copied, SnackType.info);
      this.refresh();
    },Error => {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  deleteEvent(id: number){
    this.httpService.deleteEvent_post(id).subscribe(data => {
      this.alertService.alert(AlertTexts.event_deleted, SnackType.info);
      this.refresh();
    },Error => {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  confirm(id: number){
    this._updateEventRegistration(id, true, false);
  }

  present(id: number){
    this._updateEventRegistration(id, true, true);
  }

  cancel(id: number){
    this._updateEventRegistration(id, false, false);
  }

  private _updateEventRegistration(id: number, confirmed: boolean, present: boolean){
    this.httpService.updateRegistration_post(id, confirmed, present, this.curEventId).subscribe(data => {
      this.alertService.alert(AlertTexts.event_reg_updated, SnackType.info);
      this.refreshMembers(this.curEventId);
    },Error => {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  private _resetAll(eventId: number){
    this.httpService.eventResetAll_post(eventId).subscribe(data => {
      this.refreshMembers(eventId);
      this.alertService.alert(AlertTexts.event_reg_all, SnackType.info);
    },Error => {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  private _confirmedAll(eventId: number){
    this.httpService.eventConfirmedAll_post(eventId).subscribe(data => {
      this.refreshMembers(eventId);
      this.alertService.alert(AlertTexts.event_reg_all, SnackType.info);
    },Error => {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  private _presentAll(eventId: number){
    this.httpService.eventPresentAll_post(eventId).subscribe(data => {
      this.refreshMembers(eventId);
      this.alertService.alert(AlertTexts.event_reg_all, SnackType.info);
    },Error => {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  Expanded(el: WTEvent){
    this.editor = new Editor(el);
  }

  refresh() {
    this.getEvents();
    // this.changeDetectorRefs.detectChanges();
  }

  refreshMembers(id: number){
    this.getMembers(id);
    this.getEvent(this.curEventId);
  }
}

class Editor {
  private _name: boolean;
  get Name(): boolean{
    return this._name;
  }
  set Name(input){
    this.ResetAll();
    this._name = input;
  }

  private _location: boolean;
  get Location(): boolean{
    return this._location;
  }
  set Location(input){
    this.ResetAll();
    this._location = input;
  }

  private _prize: boolean;
  get Prize(): boolean{
    return this._prize;
  }
  set Prize(input){
    this.ResetAll();
    this._prize = input;
  }

  private _memberLimit: boolean;
  get MemberLimit(): boolean{
    return this._memberLimit;
  }
  set MemberLimit(input){
    this.ResetAll();
    this._memberLimit = input;
  }

  private _minLimit: boolean;
  get MinLimit(): boolean{
    return this._minLimit;
  }
  set MinLimit(input){
    this.ResetAll();
    this._minLimit = input;
  }

  private _start: boolean;
  get Start(): boolean{
    return this._start;
  }
  set Start(input){
    this.ResetAll();
    this._start = input;
  }

  private _end: boolean;
  get End(): boolean{
    return this._end;
  }
  set End(input){
    this.ResetAll();
    this._end = input;
  }

  private _deadline: boolean;
  get Deadline(): boolean{
    return this._deadline;
  }
  set Deadline(input){
    this.ResetAll();
    this._deadline = input;
  }

  private _description: boolean;
  get Description(): boolean{
    return this._description;
  }
  set Description(input){
    this.ResetAll();
    this._description = input;
  }

  private _school: boolean;
  get School(): boolean{
    return this._school;
  }
  set School(input){
    this.ResetAll();
    this._school = input;
  }

  get Same(): boolean{
    let result = true;
    if(this._event != null && this._eventOrigin != null){
      if(this._event.name !== this._eventOrigin.name) result = false;
      if(this._event.location !== this._eventOrigin.location) result = false;
      if(this._event.prize !== this._eventOrigin.prize) result = false;
      if(this._event.memberlimit !== this._eventOrigin.memberlimit) result = false;
      if(this._event.memberlimitMin !== this._eventOrigin.memberlimitMin) result = false;
      if(this._event.datetimeDeadline !== this._eventOrigin.datetimeDeadline) result = false;
      if(this._event.datetimeStart !== this._eventOrigin.datetimeStart) result = false;
      if(this._event.datetimeEnd !== this._eventOrigin.datetimeEnd) result = false;
      if(this._event.school !== this._eventOrigin.school) result = false;
      if(this._event.description !== this._eventOrigin.description) result = false;
    }

    return result;
  }

  private _event: WTEvent;
  private _eventOrigin: WTEvent;

  constructor(event?: WTEvent){
    if(event != null) {
      this._event = event;
      this.shadowCopyEvent();
      this.ResetAll();
    }
  }

  public RevertChanges(){
    this._event.name = this._eventOrigin.name;
    this._event.location = this._eventOrigin.location;
    this._event.prize = this._eventOrigin.prize;
    this._event.memberlimit = this._eventOrigin.memberlimit;
    this._event.memberlimitMin = this._eventOrigin.memberlimitMin;
    this._event.datetimeDeadline = this._eventOrigin.datetimeDeadline;
    this._event.datetimeStart = this._eventOrigin.datetimeStart;
    this._event.datetimeEnd = this._eventOrigin.datetimeEnd;
    this._event.school = this._eventOrigin.school;
    this._event.description = this._eventOrigin.description;
  }

  public ResetAll(){
    this._name = true;
    this._location = true;
    this._prize = true;
    this._memberLimit = true;
    this._minLimit = true;
    this._deadline = true;
    this._start = true;
    this._end = true;
    this._school = true;
    this._description = true;
  }

  public shadowCopyEvent(){
    if(this._event !== undefined){
      this._eventOrigin = new WTEvent(
        this._event.id,
        this._event.datetime,
        this._event.name,
        this._event.school,
        this._event.location,
        this._event.prize,
        this._event.description,
        this._event.memberlimit,
        this._event.memberlimitMin,
        this._event.members,
        this._event.confirmed,
        this._event.present,
        this._event.datetimeStart,
        this._event.datetimeDeadline,
        this._event.datetimeEnd,
        this._event.visible);
    }

  }
}
