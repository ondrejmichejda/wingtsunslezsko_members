import { Injectable } from '@angular/core';
import {isNull} from 'util';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import { AlertTexts } from '../enum/AlertTexts';
import {LocalStorage} from '../enum/LocalStorage';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(private router: Router,
              private alertService: AlertService) {
    if (localStorage.getItem(LocalStorage.user) === isNull) {
      localStorage.setItem(LocalStorage.user, '0');
    }

    if (localStorage.getItem(LocalStorage.admin) === isNull) {
      localStorage.setItem(LocalStorage.admin, '0');
    }
  }

  private setUserName(name: string): void {
    localStorage.setItem(LocalStorage.userName, name);
  }

  login(name: string): void {
    localStorage.setItem(LocalStorage.user, '1');
    this.setUserName(name);
    this.systemAlert(AlertTexts.log_in);
  }

  loginAdmin() {
    localStorage.setItem(LocalStorage.admin, '1');
  }

  logout(): void {
    localStorage.setItem(LocalStorage.user, '0');
    this.router.navigate(['']);
    this.systemAlert(AlertTexts.log_out);
  }

  logoutAdmin(): void {
    localStorage.setItem(LocalStorage.admin, '0');
  }

  isLogged(): boolean {
    return localStorage.getItem(LocalStorage.user) === '1' ? true : false;
  }

  loggedUser(): string {
    return localStorage.getItem(LocalStorage.userName);
  }

  isLoggedAdmin(): boolean {
    return localStorage.getItem(LocalStorage.admin) === '1' ? true : false;
  }

  private systemAlert(msg: string): void {
    this.alertService.alert(msg);
  }
}
