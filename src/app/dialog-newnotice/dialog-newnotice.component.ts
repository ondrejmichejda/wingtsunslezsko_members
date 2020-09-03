import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {WTNotice} from '../class/data/WTNotice';
import {QuilloptionsService} from '../services/quilloptions.service';

@Component({
  selector: 'app-dialog-newnotice',
  templateUrl: './dialog-newnotice.component.html',
  styleUrls: ['./dialog-newnotice.component.css']
})
export class DialogNewnoticeComponent implements OnInit {

  notice: WTNotice;

  modules = {
    toolbar: this.quillService.basicToolbar
  };

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              private quillService: QuilloptionsService) {
    this.notice = new WTNotice(0, '', 0, '', '', '', false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  ActualDate(): Date {
    return new Date();
  }
}

export interface DialogData {
  text: string;
}
