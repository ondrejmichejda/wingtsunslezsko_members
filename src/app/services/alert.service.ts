import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackType} from '../enum/SnackType';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snack: MatSnackBar) { }

  alert(msg: string, type: SnackType = SnackType.info): void {
    this.snack.open(msg, undefined, {
      duration: 4000,
      panelClass: ['mat-toolbar', type]
    });
  }
}

