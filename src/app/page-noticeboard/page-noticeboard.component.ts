import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {Notice} from '../class/Notice';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-page-noticeboard',
  templateUrl: './page-noticeboard.component.html',
  styleUrls: ['./page-noticeboard.component.css']
})
export class PageNoticeboardComponent implements OnInit {



  constructor(private headerService: HeaderService, private httpService: HttpService) {}

  notices: Notice[];
  error = '';

  ngOnInit() {
    this.headerService.setTitle('Nástěnka');
    this.getNotices();
  }

  getNotices(): void {
    this.httpService.getNotices().subscribe(
      (res: Notice[]) => {
        this.notices = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
