import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {WTMember} from '../class/data/WTMember';
import {DatastorageService} from '../services/datastorage.service';
import {HttpService} from '../services/http.service';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {AlertService} from '../services/alert.service';

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
              private alertService: AlertService) {
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
              this.alertService.alert(AlertTexts.set_pwdudpated, SnackType.info);
            },Error => {
              console.log(Error);
              this.alertService.alert(AlertTexts.fail, SnackType.error);
            });
          }
          else {
            this.alertService.alert(AlertTexts.set_pwdnotmatch, SnackType.error);
          }
        }
      },
      (err) => {
        console.log(err);
        this.alertService.alert(AlertTexts.set_wrongpwd, SnackType.error);
      }
    );
  }

}
