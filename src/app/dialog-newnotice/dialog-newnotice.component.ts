import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {WTNotice} from '../class/data/WTNotice';

@Component({
  selector: 'app-dialog-newnotice',
  templateUrl: './dialog-newnotice.component.html',
  styleUrls: ['./dialog-newnotice.component.css']
})
export class DialogNewnoticeComponent implements OnInit {

  notice: WTNotice;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
    this.notice = new WTNotice(0, '', 0, '', '', '', false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}

export interface DialogData {
  text: string;
}
