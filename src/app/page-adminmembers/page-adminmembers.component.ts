import { Component, OnInit } from '@angular/core';
import {WTMember} from '../class/data/WTMember';
import {WTEvent} from '../class/data/WTEvent';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {HttpService} from '../services/http.service';
import {AlertService} from '../services/alert.service';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-adminmembers',
  templateUrl: './page-adminmembers.component.html',
  styleUrls: ['./page-adminmembers.component.css']
})
export class PageAdminmembersComponent implements OnInit {

  member: WTMember
  saveEnable: boolean;
  email: string;
  saveBtnText = 'Uložit';

  constructor(private httpService: HttpService,
              private alertService: AlertService,
              private headerService: HeaderService) {
    this.headerService.setTitle('Správa členů');
  }

  ngOnInit(): void {
    this.initMember();
  }

  addMember() {
    this.httpService.createMember_post(this.member).subscribe(data => {
      if(this.email.length > 0)
        this.sendEmail();

      this.alertService.alert(AlertTexts.member_created, SnackType.info);
      this.initMember();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  sendEmail() {
    const emailText =
      '<p>Ahoj, tvé přihlašovací údaje jsou:</p>' +
      '<ul>' +
      '<li>Login: <b>' + this.member.login + '</b></li>' +
      '<li>Heslo: <b>' + this.member.pwd + '</b></li>' +
      '</ul>';
    this.httpService.sendMail_post(this.email, emailText).subscribe(data => {
      this.initMember();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  emptyFieldsCheck() {
    const nameL = this.member.name.length > 0;
    const surnameL = this.member.surname.length > 0;
    const loginL = this.member.login.length > 0;
    const pwdL = this.member.pwd.length > 0;
    this.saveEnable =  nameL && surnameL && loginL && pwdL && this.emailCheck();
    this.saveBtnText = this.email.length > 0 ? 'Uložit a poslat' : 'Uložit';
  }

  emailCheck() {
    return (this.email.length === 0) || (this.email.length > 0 && this._validateEmail(this.email));
  }

  initMember(){
    this.member = new WTMember(0,'','','', '', '', 0, '', false);
    this.email = '';
  }

  private _validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

