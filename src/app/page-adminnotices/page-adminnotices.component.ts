import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTNotice} from '../class/data/WTNotice';
import {Convert} from '../class/Convert';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogComboboxComponent} from '../dialog-combobox/dialog-combobox.component';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {AlertService} from '../services/alert.service';
import {DialogNewnoticeComponent} from '../dialog-newnotice/dialog-newnotice.component';

@Component({
  selector: 'app-page-adminnotices',
  templateUrl: './page-adminnotices.component.html',
  styleUrls: ['./page-adminnotices.component.css']
})
export class PageAdminnoticesComponent implements OnInit {

  notices: WTNotice[];
  error = '';

  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              private dialog: MatDialog,
              private alertService: AlertService) {
    this.headerService.setTitle('Správa nástěnky');
  }

  ngOnInit(): void {
    this.getNotices();
  }

  GetDate(date: string): Date{
    return Convert.sqlToJsDate(date);
  }

  getSchool(s: number): string{
    switch(+s){
      case 0:
        return 'Vše';
      case 1:
        return 'Ostrava';
      case 2:
        return 'Třinec';
      case 3:
        return 'Český Těšín';
    }
  }

  changeVisibility(notice: WTNotice){
    this.httpService.updateVisibleNotice_post(notice.id, !!!+notice.visible).subscribe(
      (res: WTNotice[]) => {
        this.alertService.alert(AlertTexts.notice_updated, SnackType.info);
        this.getNotices();
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  private _deleteNotice(id: number){
    this.httpService.deleteNotice_post(id).subscribe(
      (res: WTNotice[]) => {
        this.alertService.alert(AlertTexts.notice_deleted, SnackType.info);
        this.getNotices();
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  private _createNotice(notice: WTNotice){
    this.httpService.createNotice_post(notice).subscribe(
      (res: WTNotice[]) => {
        this.alertService.alert(AlertTexts.notice_created, SnackType.info);
        this.getNotices();
      },
      (err) => {
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

  dialogDelete(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._deleteNotice(id);
      }
    });
  }

  getNotices(): void {
    this.httpService.getNoticesAll().subscribe(
      (res: WTNotice[]) => {
        this.notices = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
