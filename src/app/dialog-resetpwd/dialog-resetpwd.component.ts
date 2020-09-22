import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonFunctionsService} from '../services/common-functions.service';

@Component({
  selector: 'app-dialog-resetpwd',
  templateUrl: './dialog-resetpwd.component.html',
  styleUrls: ['./dialog-resetpwd.component.css']
})
export class DialogResetpwdComponent implements OnInit {

  enabled: boolean;

  constructor(public dialogRef: MatDialogRef<DialogResetpwdComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataReset,
              private common: CommonFunctionsService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validate() {
    this.enabled = this.data.password.length > 0 && this.common.ValidateEmail(this.data.email) || this.data.email.length === 0;
  }
}

export interface DialogDataReset {
  password: string;
  email: string;
}
