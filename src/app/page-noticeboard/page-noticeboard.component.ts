import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTNotice} from '../class/WTNotice';

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

  getNotices(): void {
    this.httpService.getNotices().subscribe(
      (res: WTNotice[]) => {
        this.notices = res;
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
