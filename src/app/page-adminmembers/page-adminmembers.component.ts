import {Component, OnInit, ViewChild} from '@angular/core';
import {WTMember} from '../class/data/WTMember';
import {WTEvent} from '../class/data/WTEvent';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {HttpService} from '../services/http.service';
import {AlertService} from '../services/alert.service';
import {HeaderService} from '../services/header-title-change.service';
import {DeviceService} from '../services/device.service';
import {MatSort} from '@angular/material/sort';
import {WTMembersOnEvent} from '../class/data/WTMembersOnEvent';
import {MatTableDataSource} from '@angular/material/table';
import {ExceptionsService} from '../services/exceptions.service';
import {CommonFunctionsService} from '../services/common-functions.service';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataReset, DialogResetpwdComponent} from '../dialog-resetpwd/dialog-resetpwd.component';
import {DialogUpdatememberComponent} from '../dialog-updatemember/dialog-updatemember.component';

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
  loginExists = false;

  // Table
  error = '';
  filter = '';
  members: WTMember[];
  dataSource;
  columnsToDisplay = this.device.IsMobile() ? ['surname', 'control'] : ['id', 'login', 'name', 'surname', 'school', 'control'];
  @ViewChild('eventSort', {static: true}) eventSort: MatSort;

  constructor(private httpService: HttpService,
              private alertService: AlertService,
              private headerService: HeaderService,
              private exceptions: ExceptionsService,
              public device: DeviceService,
              public common: CommonFunctionsService,
              private dialog: MatDialog) {
    this.headerService.setTitle('Správa členů');
  }

  ngOnInit(): void {
    this.initMember();
    this.getMembers();
  }

  // add member tab
  addMember() {
    this.httpService.createMember_post(this.member).subscribe(data => {
      if(this.email.length > 0)
        this.sendEmail(this.member.login, this.member.pwd, this.email);

      this.alertService.alert(AlertTexts.member_created, SnackType.info);
      this.initMember();
      this.getMembers();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  sendEmail(login, pwd, email) {
    const emailText =
      '<p>Ahoj, tvé přihlašovací údaje jsou:</p>' +
      '<ul>' +
      '<li>Login: <b>' + login + '</b></li>' +
      '<li>Heslo: <b>' + pwd + '</b></li>' +
      '</ul>';
    this.httpService.sendMail_post(email, emailText).subscribe(data => {
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
    this.saveEnable =  nameL && surnameL && loginL && pwdL && this.emailCheck() && !this.loginExists;
    this.saveBtnText = this.email.length > 0 ? 'Uložit a poslat' : 'Uložit';
  }

  loginUniqueCheck() {
    this.loginExists = (this.members.find(m => m.login.toLowerCase() === this.member.login.toLowerCase()) !== undefined);
  }

  buildLogin() {
    this.member.login = this.common.slugify(this.member.name.substr(0,3) + this.member.surname.substr(0, 3));
    this.loginUniqueCheck();
  }

  emailCheck() {
    return (this.email.length === 0) || (this.email.length > 0 && this.common.ValidateEmail(this.email));
  }

  initMember(){
    this.member = new WTMember(0,'','','', '', '', 1, '', '', false);
    this.email = '';
  }

  // member list tab
  applyFilter() {
    const filterValue = this.filter;
    if(filterValue.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
    else
      this.dataSource.filter = 'nevimjakjinaktotoodfiltrovat';
  }

  dialogDelete(member: WTMember): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteMember(member);
      }
    });
  }

  deleteMember(member: WTMember) {
    this.httpService.deleteMember_post(member).subscribe(data => {
      this.alertService.alert(AlertTexts.member_deleted, SnackType.info);
      this.getMembers();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  dialogReset(member: WTMember) {
    const dialogRef = this.dialog.open(DialogResetpwdComponent, {
      width: '300px',
      data: {password: '', email: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        const data: DialogDataReset = result;
        member.pwd = data.password;
        this.resetPwd(member, data.email);
      }
    });
  }

  resetPwd(member: WTMember, email) {
    this.httpService.updatePwdMember_post(member).subscribe(data => {
      this.alertService.alert(AlertTexts.member_updated, SnackType.info);

      if(email.length > 0)
        this.sendEmail(member.login, member.pwd, email);
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  dialogUpdate(member: WTMember) {
    const dialogRef = this.dialog.open(DialogUpdatememberComponent, {
      width: '300px',
      data: {m: member}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.updateMember(result.m);
      }
    });
  }

  updateMember(member: WTMember) {
    this.httpService.updateMember_post(member).subscribe(data => {
      this.alertService.alert(AlertTexts.member_updated, SnackType.info);
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  getMembers() {
    this.httpService.getMembers().subscribe(
      (members: WTMember[]) => {
        this.members = members;
        this.dataSource = new MatTableDataSource(members);
        this.dataSource.filterPredicate = (data, filter: string): boolean =>
          data.login.toLowerCase().includes(filter) ||
          data.name.toLowerCase().includes(filter) ||
          data.surname.toLowerCase().includes(filter)||
          data.school.includes(this.common.getSchoolCode(filter));
        this.dataSource.sort = this.eventSort;
        this.applyFilter();
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
