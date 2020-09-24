import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent, DialogData} from '../dialog/dialog.component';
import {WTVideo} from '../class/data/WTVideo';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-video',
  templateUrl: './dialog-video.component.html',
  styleUrls: ['./dialog-video.component.css']
})
export class DialogVideoComponent implements OnInit {

  videoLink: SafeUrl;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataVideo,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.buildVideoUrl(this.data.video.link));
  }

  buildVideoUrl(link: string): string {
    return 'https://www.youtube.com/embed/' + link.split('/').pop();
  }

  getVideoId(link: string): string {
    return link.split('/').pop();
  }

  noClick(): void{
    this.dialogRef.close();
  }
}

export interface DialogDataVideo {
  video: WTVideo;
}
