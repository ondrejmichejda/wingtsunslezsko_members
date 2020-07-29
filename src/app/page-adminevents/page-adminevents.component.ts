import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpService} from '../services/http.service';
import {WTEvent} from '../class/WTEvent';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Convert} from '../class/Convert';

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
  columnsToDisplay = ['id', 'name', 'datetimeStart', 'members', 'memberlimit'];
  expandedElement: WTEvent | null;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  events: WTEvent[];
  error = '';

  editor: Editor;

  constructor(private httpService: HttpService) {
    this.editor = new Editor();
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.httpService.getEventsAll().subscribe(
      (events: WTEvent[]) => {
        this.events = events;
        this.dataSource = new MatTableDataSource(this.events);
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getDate(dt: string): Date{
    return Convert.sqlToJsDate(dt);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveBtn(event: WTEvent){
    console.log(event);
  }

  Expanded(el: WTEvent){
    this.editor = new Editor(el);
  }
}

class Editor {
  private _name: boolean;
  get Name(): boolean{
    return this._name;
  }
  set Name(input){
    this._resetAll();
    this._name = input;
  }

  private _location: boolean;
  get Location(): boolean{
    return this._location;
  }
  set Location(input){
    this._resetAll();
    this._location = input;
  }

  private _prize: boolean;
  get Prize(): boolean{
    return this._prize;
  }
  set Prize(input){
    this._resetAll();
    this._prize = input;
  }

  private _memberLimit: boolean;
  get MemberLimit(): boolean{
    return this._memberLimit;
  }
  set MemberLimit(input){
    this._resetAll();
    this._memberLimit = input;
  }

  private _minLimit: boolean;
  get MinLimit(): boolean{
    return this._minLimit;
  }
  set MinLimit(input){
    this._resetAll();
    this._minLimit = input;
  }

  private _start: boolean;
  get Start(): boolean{
    return this._start;
  }
  set Start(input){
    this._resetAll();
    this._start = input;
  }

  private _end: boolean;
  get End(): boolean{
    return this._end;
  }
  set End(input){
    this._resetAll();
    this._end = input;
  }

  private _deadline: boolean;
  get Deadline(): boolean{
    return this._deadline;
  }
  set Deadline(input){
    this._resetAll();
    this._deadline = input;
  }

  private _description: boolean;
  get Description(): boolean{
    return this._description;
  }
  set Description(input){
    this._resetAll();
    this._description = input;
  }

  private _school: boolean;
  get School(): boolean{
    return this._school;
  }
  set School(input){
    this._resetAll();
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
      this._shadowCopyEvent();
      this._resetAll();
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

  private _resetAll(){
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

  private _shadowCopyEvent(){
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
      this._event.notconfirmed,
      this._event.datetimeStart,
      this._event.datetimeDeadline,
      this._event.datetimeEnd);
  }
}
