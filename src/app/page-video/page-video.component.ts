import {Component, OnInit, ɵbypassSanitizationTrustResourceUrl} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import { DomSanitizer } from '@angular/platform-browser';
import {sanitizeIdentifier} from '@angular/compiler';
import {LocalStorage} from '../enum/LocalStorage';

@Component({
  selector: 'app-page-video',
  templateUrl: './page-video.component.html',
  styleUrls: ['./page-video.component.css']
})
export class PageVideoComponent implements OnInit {

  selected;
  url = 'https://www.youtube.com/embed/tgbNymZ7vqY';
  trustedUrl;

  set login_cb(value) {
    if (value) {
      this.userAuthService.login('Ondrej Michejda');
    } else {
      this.userAuthService.logout();
    }
  }

  constructor(private headerService: HeaderService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.headerService.setTitle('Video');
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.selected);
  }

}
