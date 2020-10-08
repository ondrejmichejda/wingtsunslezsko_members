import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WTMember} from '../class/data/WTMember';

@Component({
  selector: 'app-dialog-updatemember',
  templateUrl: './dialog-updatemember.component.html',
  styleUrls: ['./dialog-updatemember.component.css']
})
export class DialogUpdatememberComponent implements OnInit {

  enabled: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdatememberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataMember) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validate() {
    const member = this.data.m;
    this.enabled = member.name.length > 0 && member.surname.length > 0 && member.login.length > 0;
  }
}

export interface DialogDataMember {
  m: WTMember;
}
