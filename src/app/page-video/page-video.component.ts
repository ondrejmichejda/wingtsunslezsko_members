import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-page-video',
  templateUrl: './page-video.component.html',
  styleUrls: ['./page-video.component.css']
})
export class PageVideoComponent implements OnInit {
  selVideo;

  constructor(private headerService: HeaderService,
              private sanitizer: DomSanitizer) {
    this.headerService.setTitle('Video');
  }

  ngOnInit() {

  }

}
