import { Injectable } from '@angular/core';
import {LocalStorage} from '../enum/LocalStorage';
import {isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public adminMenuOn: boolean;

  constructor() {
    if (localStorage.getItem(LocalStorage.adminMenuOn) === isNull) {
      localStorage.setItem(LocalStorage.adminMenuOn, '0');
    }
  }

  setAdminMenuOn(): void {
    localStorage.setItem(LocalStorage.adminMenuOn, '1');
  }

  setAdminMenuOff(): void {
    localStorage.setItem(LocalStorage.adminMenuOn, '0');
  }

  isAdminMenuOn(): boolean {
    return localStorage.getItem(LocalStorage.adminMenuOn) === '1';
  }
}
