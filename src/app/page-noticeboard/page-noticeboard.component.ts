import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTNotice} from '../class/data/WTNotice';
import {Convert} from '../class/Convert';
import {DatastorageService} from '../services/datastorage.service';

@Component({
  selector: 'app-page-noticeboard',
  templateUrl: './page-noticeboard.component.html',
  styleUrls: ['./page-noticeboard.component.css']
})
export class PageNoticeboardComponent implements OnInit {
  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              private dataStorage: DatastorageService) {
    this.headerService.setTitle('Nástěnka');
  }

  notices: WTNotice[];
  error = '';

  ngOnInit() {
    this.getNotices(this.dataStorage.Member.school);
  }

  public GetDate(date: string): Date{
    return Convert.sqlToJsDate(date);
  }

  getNotices(school: number): void {
    this.httpService.getNotices(school).subscribe(
      (res: WTNotice[]) => {
        this.notices = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
