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
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CommonFunctions} from '../class/CommonFunctions';
import {LogService, Section} from '../services/log.service';
import {WTEvent} from '../class/data/WTEvent';

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

  editor: Editor;
  common = CommonFunctions;
  error: string;
  video: WTVideo;
  videos: WTVideo[];
  dataSource;
  expandedElement: WTVideo | null;
  columnsToDisplay = this.device.IsMobile() ? ['name', 'control'] : ['id', 'name', 'category', 'control'];
  @ViewChild('eventSort', {static: true}) videoSort: MatSort;
  showLoading = false;

  constructor(public device: DeviceService,
              private httpService: HttpService,
              private dialog: MatDialog,
              private headerService: HeaderService,
              private sanitizer: DomSanitizer,
              private alertService: AlertService,
              private log: LogService) {
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
    this.editor = new Editor(el);
    this.editor.video = this.video;
  }

  getVideos(): void {
    this.showLoading = true;
    this.httpService.getVideosAll().subscribe(
      (videos: WTVideo[]) => {
        this.videos = videos;
        this.dataSource = new MatTableDataSource(this.videos);
        this.dataSource.filterPredicate = (data, filter: string): boolean =>
          data.category.includes(CommonFunctions.getVideoCategoryCode(filter)) ||
          data.name.toLowerCase().includes(filter);
        this.dataSource.sort = this.videoSort;
        this.video = this.videos[0];
        this.editor = new Editor(this.video);
        this.showLoading = false;
      },
      (err) => {
        this.log.aError(Section.Video, `Chyba při načítání videí`, undefined, err);
        this.error = err;
        this.showLoading = false;
      }
    );
  }

  createVideo(){
    this.httpService.createVideo().subscribe(
      (res: boolean) => {
        this.log.aInfo(Section.Video, `Vytvořeno`);
        this.alertService.alert(AlertTexts.video_created, SnackType.info);
        this.getVideos();
      },
      (err) => {
        this.log.aError(Section.Video, `Chyba při tvorbě`, undefined, err);
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

      for(const change of this.editor.GetChanges()){
        this.log.aInfo(Section.Video, `Upraveno: ${video.name} (${video.id})`, undefined,
          change);
      }

      this.alertService.alert(AlertTexts.video_updated, SnackType.info);
      this.getVideos();
    },Error => {
      this.log.aError(Section.Video, `Chyba při úpravě: ${video.name} (${video.id})`, undefined,
        Error);
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
      this.log.aInfo(Section.Video, `Smazáno: ${video.name} (${video.id})`,
        undefined, CommonFunctions.getVideoCategory(video.category));
      this.alertService.alert(AlertTexts.video_deleted, SnackType.info);
      this.getVideos();
    },Error => {
      this.log.aError(Section.Video, `Chyba při mazání: ${video.name} (${video.id})`, undefined, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }
}

class Editor{

  private videoOrig: WTVideo;
  video: WTVideo;

  constructor(video: WTVideo){
    this.videoOrig = new WTVideo(video.id, video.datetime, video.name, video.category, video.description, video.link, video.visible);
  }

  Same(): boolean{
    let result = true;
    const o: WTVideo = this.videoOrig;
    const n: WTVideo = this.video;

    if(o != null && n != null){
      if(o.name !== n.name) result = false;
      if(o.description !== n.description) result = false;
      if(o.link !== n.link) result = false;
      if(o.category !== n.category) result = false;
    }
    return result;
  }

  GetChanges(): string[]{
    const arr: string[] = Array();
    const o: WTVideo = this.videoOrig;
    const n: WTVideo = this.video;
    arr.push(this.eval('Jméno', o.name, n.name));
    arr.push(this.eval('Kategorie', CommonFunctions.getVideoCategory(o.category), CommonFunctions.getVideoCategory(n.category)));
    arr.push(this.eval('Link', o.link, n.link));
    arr.push(this.eval('Viditelnost', o.visible, n.visible, true));

    if(o.description !== n.description){
      arr.push(`Změna popisu`);
    }

    const result: string[] = Array();

    for(const element of arr){
      if(element !== undefined)
        result.push(element);
    }

    return result;
  }

  private eval(name: string,propOrig: any, propNew: any, b: boolean = false): string{
    if(propOrig !== propNew){
      if(b){
        return `${name}: ${!!Number(propOrig)} -> ${!!Number(propNew)}`;
      }
      else {
        return `${name}: ${propOrig} -> ${propNew}`;
      }
    }
  }
}
