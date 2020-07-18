import {Injectable} from '@angular/core';
import {isNull} from 'util';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {AlertTexts} from '../enum/AlertTexts';
import {LocalStorage} from '../enum/LocalStorage';
import {WTMember} from '../class/WTMember';
import {HttpService} from './http.service';
import {SnackType} from '../enum/SnackType';
import {DatastorageService} from './datastorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  Member: WTMember;

  constructor(private router: Router,
              private alertService: AlertService,
              private httpService: HttpService,
              private dataStorage: DatastorageService) {

    if (localStorage.getItem(LocalStorage.user) === isNull) {
      localStorage.setItem(LocalStorage.user, '0');
    }

    if (localStorage.getItem(LocalStorage.admin) === isNull) {
      localStorage.setItem(LocalStorage.admin, '0');
    }
  }

  login(login: string): void {
    let _member: WTMember;
    this.httpService.getMember(login).subscribe(
      (res: WTMember[]) => {
        _member = res[0];
        // Logging in by setting up this.Member
        if(_member === undefined){
          this.alertService.alert(AlertTexts.log_in_failed, SnackType.error);
        }
        else{
          this.dataStorage.Member = _member;
        }
      },
      (err) => {
        this.alertService.alert(AlertTexts.log_in_failed, SnackType.error);
      }
    );
  }

  loginAdmin() {
    localStorage.setItem(LocalStorage.admin, '1');
  }

  logout(): void {
    localStorage.setItem(LocalStorage.user, '0');
    this.router.navigate(['']);
    this.alertService.alert(AlertTexts.log_out);
  }

  logoutAdmin(): void {
    localStorage.setItem(LocalStorage.admin, '0');
  }

  isLogged(): boolean {
    return this.dataStorage.Member !== null;
  }

  loggedUser(): string {
    return localStorage.getItem(LocalStorage.userName);
  }

  isLoggedAdmin(): boolean {
    return localStorage.getItem(LocalStorage.admin) === '1' ? true : false;
  }

  private setUserName(name: string): void {
    localStorage.setItem(LocalStorage.userName, name);
  }

}
