import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {QuilloptionsService} from '../services/quilloptions.service';

@Component({
  selector: 'app-dialog-gallery',
  templateUrl: './dialog-gallery.component.html',
  styleUrls: ['./dialog-gallery.component.css']
})
export class DialogGalleryComponent implements OnInit {

  public pictureUrl = 'und';

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  setAndClose(url: string){
    this.pictureUrl = url;
    this.dialogRef.close();
  }
}

export interface DialogData {
  url: string;
}
