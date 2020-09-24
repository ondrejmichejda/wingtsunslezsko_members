import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTVideo} from '../class/data/WTVideo';
import {CommonFunctionsService} from '../services/common-functions.service';
import {DeviceService} from '../services/device.service';
import {DialogUpdatememberComponent} from '../dialog-updatemember/dialog-updatemember.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogVideoComponent} from '../dialog-video/dialog-video.component';


@Component({
  selector: 'app-page-video',
  templateUrl: './page-video.component.html',
  styleUrls: ['./page-video.component.css']
})
export class PageVideoComponent implements OnInit {

  videos: WTVideo[];
  error: string;
  category = 0;

  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              public commonFc: CommonFunctionsService,
              public device: DeviceService,
              private dialog: MatDialog) {
    this.headerService.setTitle('Video');
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this.httpService.getVideos().subscribe(
      (videos: WTVideo[]) => {
        this.videos = videos.filter(video => video.category === this.category);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  dialogVideo(video: WTVideo) {
    const dialogRef = this.dialog.open(DialogVideoComponent, {
      width: '90%',
      height: '80vh',
      data: {video}
    });
  }

  getDescription(video: WTVideo): string {
    return video.description.length > 0 ? this.commonFc.ShortText(video.description, 200) : video.name;
  }

  getVideoId(link: string): string {
    return link.split('/').pop();
  }

  getVideoThumbnail(link: string): string {
    const videoId = this.getVideoId(link);
    return 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
  }

}
