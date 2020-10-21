import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTNotice} from '../class/data/WTNotice';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {AlertService} from '../services/alert.service';
import {DialogNewnoticeComponent} from '../dialog-newnotice/dialog-newnotice.component';
import {LogService, Section} from '../services/log.service';
import {CommonFunctions} from '../class/CommonFunctions';

@Component({
  selector: 'app-page-adminnotices',
  templateUrl: './page-adminnotices.component.html',
  styleUrls: ['./page-adminnotices.component.css']
})
export class PageAdminnoticesComponent implements OnInit {

  notices: WTNotice[];
  error = '';

  common = CommonFunctions;

  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              private dialog: MatDialog,
              private alertService: AlertService,
              private log: LogService) {
    this.headerService.setTitle('Správa nástěnky');
  }

  ngOnInit(): void {
    this.getNotices();
  }

  GetDate(date: string): Date{
    return CommonFunctions.sqlToJsDate(date);
  }

  changeVisibility(notice: WTNotice){
    this.httpService.updateVisibleNotice_post(notice.id, !!!+notice.visible).subscribe(
      (res: WTNotice[]) => {
        this.log.aInfo(Section.Notice, `Viditelnost příspěvku upravena: ${notice.head} (${notice.id})`, notice.school, `Viditelnost: ${!!!+notice.visible}`);
        this.alertService.alert(AlertTexts.notice_updated, SnackType.info);
        this.getNotices();
      },
      (err) => {
        this.log.aError(Section.Notice, 'Chyba při změně viditelnosti příspěvku', notice.school, err);
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  private _deleteNotice(notice: WTNotice){
    this.httpService.deleteNotice_post(notice.id).subscribe(
      (res: WTNotice[]) => {
        this.log.aInfo(Section.Notice, `Smazán příspěvek: ${notice.head} (${notice.id})`,
          notice.school, CommonFunctions.ShortText(notice.text, 20).replace(/<[^>]*>?/gm, ''));
        this.alertService.alert(AlertTexts.notice_deleted, SnackType.info);
        this.getNotices();
      },
      (err) => {
        this.log.aError(Section.Notice, 'Chyba při mazání příspěvku', notice.school, err);
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  private _createNotice(notice: WTNotice){
    this.httpService.createNotice_post(notice).subscribe(
      (res: WTNotice[]) => {
        this.log.aInfo(Section.Notice, `Vytvořen nový příspěvek: ${notice.head} (${notice.id})`,
          notice.school, CommonFunctions.ShortText(notice.text, 20).replace(/<[^>]*>?/gm, ''));
        this.alertService.alert(AlertTexts.notice_created, SnackType.info);
        this.getNotices();
      },
      (err) => {
        this.log.aError(Section.Notice, 'Chyba při tvorbě příspěvku', notice.school, err);
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  dialogCreate(): void {
    const dialogRef = this.dialog.open(DialogNewnoticeComponent, {width: '90%'});
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._createNotice(result);
      }
    });
  }

  dialogDelete(notice: WTNotice): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._deleteNotice(notice);
      }
    });
  }

  getNotices(): void {
    this.httpService.getNoticesAll().subscribe(
      (res: WTNotice[]) => {
        this.notices = res;
      },
      (err) => {
        this.log.aError(Section.Notice, 'Chyba při načítání příspěvků', undefined, err);
        this.error = err;
      }
    );
  }

}
