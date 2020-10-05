import {Component, OnInit, ViewChild} from '@angular/core';
import {WTVideo} from '../class/data/WTVideo';
import {DeviceService} from '../services/device.service';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AlertService} from '../services/alert.service';
import {HttpService} from '../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HeaderService} from '../services/header-title-change.service';
import {CommonFunctionsService} from '../services/common-functions.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-page-adminvideos',
  templateUrl: './page-adminvideos.component.html',
  styleUrls: ['./page-adminvideos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PageAdminvideosComponent implements OnInit {

  error: string;
  video: WTVideo;
  videos: WTVideo[];
  dataSource;
  expandedElement: WTVideo | null;
  columnsToDisplay = this.device.IsMobile() ? ['name', 'control'] : ['id', 'name', 'category', 'control'];
  @ViewChild('eventSort', {static: true}) videoSort: MatSort;

  constructor(public device: DeviceService,
              private httpService: HttpService,
              private dialog: MatDialog,
              private headerService: HeaderService,
              public common: CommonFunctionsService,
              private sanitizer: DomSanitizer,
              private alertService: AlertService) {
    this.headerService.setTitle('Správa videí');
  }

  ngOnInit(): void {
    this.getVideos()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Expanded(el: WTVideo){
    this.video = el;
  }

  getVideos(): void {
    this.httpService.getVideosAll().subscribe(
      (videos: WTVideo[]) => {
        this.videos = videos;
        this.dataSource = new MatTableDataSource(this.videos);
        this.dataSource.filterPredicate = (data, filter: string): boolean =>
          data.category.includes(this.common.getVideoCategoryCode(filter)) ||
          data.name.toLowerCase().includes(filter);
        this.dataSource.sort = this.videoSort;
        this.video = this.videos[0];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  createVideo(){
    this.httpService.createVideo().subscribe(
      (res: boolean) => {
        this.alertService.alert(AlertTexts.video_created, SnackType.info);
        this.getVideos();
      },
      (err) => {
        console.log(err);
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  changeVisibility(video: WTVideo){
    video.visible = !!!+video.visible;
    this.updateVideo(video);
  }

  buildVideoUrl(link: string): string {
    return 'https://www.youtube.com/embed/' + link.split('/').pop();
  }

  getSafeSource(link: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.buildVideoUrl(link));
  }

  updateVideo(video: WTVideo) {
    this.httpService.updateVideo(video).subscribe(data => {
      this.alertService.alert(AlertTexts.video_updated, SnackType.info);
      this.getVideos();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  dialogDelete(video: WTVideo): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteVideo(video);
      }
    });
  }

  deleteVideo(video: WTVideo){
    this.httpService.deleteVideo(video).subscribe(data => {
      this.alertService.alert(AlertTexts.video_deleted, SnackType.info);
      this.getVideos();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

}
