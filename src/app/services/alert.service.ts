import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snack: MatSnackBar) { }

  alert(msg: string): void {
    this.snack.open(msg, undefined, {
      duration: 2000,
    });
  }
}
