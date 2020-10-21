import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {WTMember} from '../class/data/WTMember';
import {DatastorageService} from '../services/datastorage.service';
import {HttpService} from '../services/http.service';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {AlertService} from '../services/alert.service';
import {LogService, Role, Section} from '../services/log.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.css']
})
export class PageSettingsComponent implements OnInit {

  oldPwd = '';
  newPwd = '';
  newPwd2 = '';

  hideOld = true;
  hideNew = true;
  hideNew2 = true;

  saveEnable = false;

  constructor(private header: HeaderService,
              private dataStorage: DatastorageService,
              private httpService: HttpService,
              private alertService: AlertService,
              private log: LogService) {
    this.header.setTitle('Nastavení');
  }

  ngOnInit(): void {
  }

  formCheck() {
    this.saveEnable =
      this.oldPwd.length > 0 &&
      this.newPwd.length > 0 &&
      this.newPwd2.length > 0;
  }

  initFields() {
    this.oldPwd = '';
    this.newPwd = '';
    this.newPwd2 = '';

    this.hideOld = true;
    this.hideNew = true;
    this.hideNew2 = true;
  }

  changePassword() {
    const me = this.dataStorage.Member;
    this.httpService.getMember_post(me.login, this.oldPwd).subscribe(
      (res: WTMember[]) => {
        if(res[0] === undefined){
          this.alertService.alert(AlertTexts.set_wrongpwd, SnackType.error);
        }
        else{
          // old password correct
          if(this.newPwd === this.newPwd2){
            // new passwords match
            const member = me;
            member.pwd = this.newPwd;
            this.httpService.updatePwdMember_post(member).subscribe(data => {
              this.log.Info(Section.Settings, 'Heslo upraveno.');
              this.alertService.alert(AlertTexts.set_pwdudpated, SnackType.info);
              this.initFields();
            },Error => {
              this.log.Error(Section.Settings, 'Chyba při změně hesla. Chyba databáze.', undefined, Error);
              this.alertService.alert(AlertTexts.fail, SnackType.error);
              this.initFields();
            });
          }
          else {
            this.alertService.alert(AlertTexts.set_pwdnotmatch, SnackType.error);
            this.log.Error(Section.Settings, 'Chyba při změně hesla.', undefined, 'Hesla se neshodují.');
            this.initFields();
          }
        }
      },
      (err) => {
        this.log.Error(Section.Settings, 'Chyba při změně hesla', undefined, 'Špatné původní heslo');
        this.alertService.alert(AlertTexts.set_wrongpwd, SnackType.error);
        this.initFields();
      }
    );
  }

}
