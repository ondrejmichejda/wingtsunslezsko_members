import {Injectable} from '@angular/core';
import {isNull} from 'util';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {AlertTexts} from '../enum/AlertTexts';
import {LocalStorage} from '../enum/LocalStorage';
import {WTMember} from '../class/data/WTMember';
import {HttpService} from './http.service';
import {SnackType} from '../enum/SnackType';
import {DatastorageService} from './datastorage.service';
import {LogService, Role, Section} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(private router: Router,
              private alertService: AlertService,
              private httpService: HttpService,
              private dataStorage: DatastorageService,
              private log: LogService) {
  }

  login(login: string, password: string): void {
    let _member: WTMember;
    this.httpService.getMember_post(login, password).subscribe(
      (res: WTMember[]) => {
        _member = res[0];
        if(_member === undefined){
          this.alertService.alert(AlertTexts.log_in_failed, SnackType.error);
        }
        else{
          this.dataStorage.Member = _member;
          this.log.Info(Section.Login, 'Login.');
          this.alertService.alert(AlertTexts.log_in, SnackType.info);

          // update last logged time
          this.httpService.updateMemberLogged_post(_member).subscribe(
            (result: WTMember) => {},
            (error) => {console.log(error);}
          );
        }
      },
      (err) => {
        this.alertService.alert(AlertTexts.log_in_failed, SnackType.error);
      }
    );
  }

  logout(): void {
    this.log.Info(Section.Login, 'Logout.');
    this.dataStorage.Member = null;
    this.alertService.alert(AlertTexts.log_out);
  }

  isLogged(): boolean {
    return this.dataStorage.Member !== null;
  }

  isLoggedAdmin(): boolean {
    return !!+this.dataStorage.Member.admin;
  }
}
