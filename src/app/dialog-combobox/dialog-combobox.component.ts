import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-combobox',
  templateUrl: './dialog-combobox.component.html',
  styleUrls: ['./dialog-combobox.component.css']
})
export class DialogComboboxComponent implements OnInit {

  result = 0;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}

export interface DialogData {
  text: string;
}
