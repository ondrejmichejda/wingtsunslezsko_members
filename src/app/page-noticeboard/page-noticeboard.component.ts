import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTNotice} from '../class/WTNotice';
import {Convert} from '../class/Convert';

@Component({
  selector: 'app-page-noticeboard',
  templateUrl: './page-noticeboard.component.html',
  styleUrls: ['./page-noticeboard.component.css']
})
export class PageNoticeboardComponent implements OnInit {
  constructor(private headerService: HeaderService,
              private httpService: HttpService) {
    this.headerService.setTitle('Nástěnka');
  }

  notices: WTNotice[];
  error = '';

  ngOnInit() {
    this.getNotices();
  }

  public GetDate(date: string): Date{
    return Convert.sqlToJsDate(date);
  }

  getNotices(): void {
    this.httpService.getNotices().subscribe(
      (res: WTNotice[]) => {
        this.notices = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
