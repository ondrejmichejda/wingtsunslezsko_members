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
import {DeviceService} from '../services/device.service';
import {WTMembersOnEvent} from '../class/data/WTMembersOnEvent';
import {HeaderService} from '../services/header-title-change.service';
import {QuilloptionsService} from '../services/quilloptions.service';
import {LogService, Section} from '../services/log.service';
import {CommonFunctions} from '../class/CommonFunctions';

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
  columnsToDisplay = this.device.IsMobile() ? ['name', 'control'] : ['id', 'name', 'datetimeStart', 'members', 'control'];
  columnsToDisplayMembers = this.device.IsMobile() ? ['surname', 'status', 'control'] :
    ['name', 'surname', 'datetime', 'status', 'control'];
  expandedElement: WTEvent | null;
  @ViewChild('eventSort', {static: true}) eventSort: MatSort;

  history: boolean;

  events: WTEvent[];
  event: WTEvent;
  members: WTMembersOnEvent[];
  curEvent: WTEvent;

  eventOld: WTEvent;
  eventNew: WTEvent;

  error = '';
  membersError = '';

  editor: Editor;

  modules = {
    toolbar: this.quillService.basicToolbar
  };

  constructor(private httpService: HttpService,
              private alertService: AlertService,
              private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              public device: DeviceService,
              private headerService: HeaderService,
              private quillService: QuilloptionsService,
              private log: LogService){
    this.editor = new Editor();
    this.history = false;
    this.headerService.setTitle('Správa událostí');
  }

  ngOnInit() {
    this.getEvents();
  }

  historyChange(){
    this.refresh();
  }

  dialogDelete(event: WTEvent): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteEvent(event);
      }
    });
  }

  dialogResetAll(event: WTEvent): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu všechny potvrdit?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._resetAll(event);
      }
    });
  }

  dialogConfirmAll(event: WTEvent): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu všechny potvrdit?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._confirmedAll(event);
      }
    });
  }

  dialogPresentAll(event: WTEvent): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu všichni dorazili?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._presentAll(event);
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
            ev => CommonFunctions.sqlToJsDate(ev.datetimeEnd) >= new Date());
        }
        this.dataSource = new MatTableDataSource(this.events);
        this.dataSource.filterPredicate = (data, filter: string): boolean =>
          data.name.toLowerCase().includes(filter) || data.id.includes(filter);
        this.dataSource.sort = this.eventSort;
        this.event = this.events[0];
      },
      (err) => {
        this.log.aError(Section.Event, 'Chyba při načítání událostí', undefined, err);
        this.error = err;
      }
    );
  }

  getMembers(event: WTEvent): void {
    this.httpService.getMembersOnEvent(event.id).subscribe(
      (members: WTMembersOnEvent[]) => {
        this.members = members;
        this.dataSourceMembers = new MatTableDataSource(this.members);
      },
      (err) => {
        this.log.aError(Section.Event, 'Chyba při načítání členů přihlášených na událost: '+event.name, event.school, err);
        this.error = err;
      }
    );
  }

  getEvent(event: WTEvent): void {
    this.httpService.getEvent(event.id).subscribe(
      (events: WTEvent[]) => {
        this.event = events[0];
      },
      (err) => {
        this.log.aError(Section.Event, 'Chyba při načítání eventu: ' + event.name, event.school, err);
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  createEvent(){
    this.httpService.createEvent_post().subscribe(
      (res: boolean) => {
        this.log.aInfo(Section.Event, 'Událost vytvořena');
        this.alertService.alert(AlertTexts.event_created, SnackType.info);
        this.getEvents();
      },
      (err) => {
        this.log.aError(Section.Event, 'Chyba při tvorbě události', undefined, err);
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

  tabChanged(event: WTEvent){
    this.getMembers(event);
    this.curEvent = event;
    this.getEvent(event);
  }

  changeVisibility(event: WTEvent){
    this.editor = new Editor(event);
    event.visible = !!!+event.visible;
    this.updateEvent(event);
  }

  changeAutoconfirm(event: WTEvent){
    this.curEvent = event;
    this.editor = new Editor(event);
    event.autoconfirm = !!!+event.autoconfirm;
    if(event.autoconfirm)
      this.dialogConfirmAll(event);
    this.updateEvent(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateEvent(event: WTEvent) {
    this.httpService.setEvent_post(event).subscribe(data => {
      // create log for every change
      for(const info of this.editor.GetChanges()){
        this.log.aInfo(Section.Event, `Událost upravena: ${event.name} (${event.id})`, event.school, info);
      }

      this.alertService.alert(AlertTexts.event_udpated, SnackType.info);
      this.editor.ResetAll();
      this.editor.shadowCopyEvent();
      this.refresh();

    },Error => {
      this.log.aError(Section.Event, 'Chyba při update eventu', event.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  copyEvent(event: WTEvent) {
    this.httpService.copyEvent_post(event.id).subscribe(data => {
      this.log.aInfo(Section.Event, `Událost zkopírována: ${event.name} (${event.id})`, event.school);
      this.alertService.alert(AlertTexts.event_copied, SnackType.info);
      this.refresh();
    },Error => {
      this.log.aError(Section.Event, 'Chyba při kopírování události', event.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  deleteEvent(event: WTEvent){
    this.httpService.deleteEvent_post(event.id).subscribe(data => {
      this.log.aInfo(Section.Event, `Událost smazána: ${event.name} (${event.id})`, event.school)
      this.alertService.alert(AlertTexts.event_deleted, SnackType.info);
      this.refresh();
    },Error => {
      this.log.aError(Section.Event, 'Chyba při mazání eventu', event.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  confirm(reg: WTMembersOnEvent){
    this._updateEventRegistration(reg, true, false);
  }

  present(reg: WTMembersOnEvent){
    this._updateEventRegistration(reg, true, true);
  }

  cancel(reg: WTMembersOnEvent){
    this._updateEventRegistration(reg, false, false);
  }

  private _updateEventRegistration(reg: WTMembersOnEvent, confirmed: boolean, present: boolean){
    this.httpService.updateRegistration_post(reg.id, confirmed, present, this.curEvent.id).subscribe(data => {

      if(confirmed && !present)
        this.log.aInfo(Section.Event, `Potvrzen ${reg.name} ${reg.surname} (${reg.login})`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id})`);
      else if(confirmed && present)
        this.log.aInfo(Section.Event, `Přítomen ${reg.name} ${reg.surname} (${reg.login})`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id})`);
      else if(!confirmed && !present)
        this.log.aInfo(Section.Event, `Reset potvrzení ${reg.name} ${reg.surname} (${reg.login})`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id})`);

      this.alertService.alert(AlertTexts.event_reg_updated, SnackType.info);
      this.refreshMembers(this.curEvent);
    },Error => {

      if(confirmed && !present)
        this.log.aInfo(Section.Event, `Chyba Potvrzen ${reg.name} ${reg.surname} (${reg.login})`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id}) - ${Error}`);
      else if(confirmed && present)
        this.log.aInfo(Section.Event, `Chyba Přítomen ${reg.name} ${reg.surname} (${reg.login})`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id}) - ${Error}`);
      else if(!confirmed && !present)
        this.log.aInfo(Section.Event, `Chyba Reset potvrzení ${reg.name} ${reg.surname} (${reg.login})`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id}) - ${Error}`);

      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  private _delete(reg: WTMembersOnEvent){
    this.httpService.deleteRegistration_post(reg.id, this.curEvent.id).subscribe(data => {
      this.log.aInfo(Section.Event, `${reg.name} ${reg.surname} (${reg.login}) z události smazán`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id})`);
      this.alertService.alert(AlertTexts.event_reg_deleted, SnackType.info);
      this.refreshMembers(this.curEvent);
    },Error => {
      this.log.aError(Section.Event, `${reg.name} ${reg.surname} (${reg.login}) nelze smazat`, this.curEvent.school, `Událost ${this.curEvent.name} (${this.curEvent.id}) - ${Error}`);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  dialogMemberDelete(element: WTMembersOnEvent): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._delete(element);
      }
    });
  }

  private _resetAll(event: WTEvent){
    this.httpService.eventResetAll_post(event.id).subscribe(data => {
      this.log.aInfo(Section.Event, `Hromadný reset členů na udalosti ${event.name} (${event.id})`, event.school);
      this.refreshMembers(event);
      this.alertService.alert(AlertTexts.event_reg_all, SnackType.info);
    },Error => {
      this.log.aError(Section.Event, `Chyba při hromadném členů resetu na události ${event.name} (${event.id})`, event.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  private _confirmedAll(event: WTEvent){
    this.httpService.eventConfirmedAll_post(event.id).subscribe(data => {
      this.log.aInfo(Section.Event, `Hromadné potvrzení na události: ${event.name} (${event.id})`, event.school);
      this.refreshMembers(event);
      this.alertService.alert(AlertTexts.event_reg_all, SnackType.info);
    },Error => {
      this.log.aError(Section.Event, `Chyba při hromadném potvrzení události ${event.name} (${event.id})`, event.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  private _presentAll(event: WTEvent){
    this.httpService.eventPresentAll_post(event.id).subscribe(data => {
      this.log.aInfo(Section.Event, `Hromadné potvrzení přítomnosti na události: ${event.name} (${event.id})`, event.school);
      this.refreshMembers(event);
      this.alertService.alert(AlertTexts.event_reg_all, SnackType.info);
    },Error => {
      this.log.aError(Section.Event, `Chyba při hromadném potvrzení přítomnosti na události ${event.name} (${event.id})`,
        event.school, Error);
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

  refreshMembers(event: WTEvent){
    this.getMembers(event);
    this.getEvent(this.curEvent);
  }

  formatDate(datetime: any): string {
    return CommonFunctions.getDate(datetime);
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

  public GetChanges(): string[] {
    const arr: string[] = Array();
    const o: WTEvent = this._eventOrigin;
    const n: WTEvent = this._event;
    arr.push(this._evaluateProperty('Jméno', o.name, n.name));
    arr.push(this._evaluateProperty('Místo', o.location, n.location));
    arr.push(this._evaluateProperty('Cena', o.prize, n.prize));
    arr.push(this._evaluateProperty('Limit členů', o.memberlimit, n.memberlimit));
    arr.push(this._evaluateProperty('Minimum členů', o.memberlimitMin, n.memberlimitMin));
    arr.push(this._evaluateProperty('Deadline', o.datetimeDeadline, n.datetimeDeadline));
    arr.push(this._evaluateProperty('Začátek', o.datetimeStart, n.datetimeStart));
    arr.push(this._evaluateProperty('Konec', o.datetimeEnd, n.datetimeEnd));
    arr.push(this._evaluateProperty('Škola', CommonFunctions.getSchool(o.school), CommonFunctions.getSchool(n.school)));
    arr.push(this._evaluateProperty('Viditelnost', o.visible, n.visible, true));
    arr.push(this._evaluateProperty('Automatické potvrzování', o.autoconfirm, n.autoconfirm, true));

    if(o.description !== n.description){
      arr.push(`Změna popisu`);
    }

    const result: string[] = Array();

    for(const element of arr){
      if(element !== undefined)
        result.push(element);
    }

    return result;
  }

  private _evaluateProperty(name: string, propOrig: any, propNew: any, b:boolean = false): string{
    if(propOrig !== propNew){
      if(b){
        return `${name}: ${!!Number(propOrig)} -> ${!!Number(propNew)}`;
      }
      else {
        return `${name}: ${propOrig} -> ${propNew}`;
      }
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
        this._event.autoconfirm,
        this._event.visible);
    }

  }
}
