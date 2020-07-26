import {Component, OnInit, ɵbypassSanitizationTrustResourceUrl} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DataService} from '../services/data.service';


@Component({
  selector: 'app-page-video',
  templateUrl: './page-video.component.html',
  styleUrls: ['./page-video.component.css']
})
export class PageVideoComponent implements OnInit {

  videos = this.dataService.GetVideoData().Data;
  selVideo;

  set selectedVideoID(value: number) {
    this.selVideo = this.videos.find(x => x.Id === value);
    console.log(this.selVideo);
    this.selectedVideoID = value;
  }

  constructor(private headerService: HeaderService,
              private sanitizer: DomSanitizer,
              private dataService: DataService) {
    this.headerService.setTitle('Video');
  }

  videoText(id: number): string {
    const foundVideo = this.videos.find(x => x.Id === id);
    return foundVideo.Text;
  }

  videoURL(id: number): SafeResourceUrl {
    const foundVideo = this.videos.find(x => x.Id === id);
    return this.sanitizer.bypassSecurityTrustResourceUrl(foundVideo.VideoURL);
  }

  ngOnInit() {

  }

}
