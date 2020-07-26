import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpService} from '../services/http.service';
import {WTEvent} from '../class/WTEvent';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveBtn(event: WTEvent){
    console.log(event);
  }
}

class Editor {
  private _name: boolean;
  get Name(): boolean{
    return this._name;
  }
  set Name(name){
    this._resetAll();
    this._name = name;
  }

  private _school: boolean;
  get School(): boolean{
    return this._school;
  }
  set School(name){
    this._resetAll();
    this._school = name;
  }

  constructor(){
    this._resetAll();
  }

  private _resetAll(){
    this._name = true;
    this._school = true;
  }
}
