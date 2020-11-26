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
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataReset, DialogResetpwdComponent} from '../dialog-resetpwd/dialog-resetpwd.component';
import {DialogUpdatememberComponent} from '../dialog-updatemember/dialog-updatemember.component';
import {CommonFunctions} from '../class/CommonFunctions';
import {LogService, Section} from '../services/log.service';
import {WTArticle} from '../class/data/WTArticle';

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
  common = CommonFunctions;
  editor: Editor;
  showLoading = false;

  // Table
  error = '';
  filter = '';
  members: WTMember[];
  dataSource;
  columnsToDisplay = this.device.IsMobile() ? ['surname', 'control'] : ['id', 'login', 'name', 'surname', 'school', 'control'];
  @ViewChild('eventSort', {static: true}) eventSort: MatSort;
  result = 0;

  constructor(private httpService: HttpService,
              private alertService: AlertService,
              private headerService: HeaderService,
              private exceptions: ExceptionsService,
              public device: DeviceService,
              private dialog: MatDialog,
              private log: LogService) {
    this.headerService.setTitle('Správa členů');
  }

  ngOnInit(): void {
    this.initMember();
    this.getMembers();
  }

  // add member tab
  addMember(member: WTMember) {
    this.httpService.createMember_post(member).subscribe(data => {
      if(this.email.length > 0)
        this.sendEmail(member, this.email);

      this.log.aInfo(Section.Member, `Vytvořen: ${member.name} ${member.surname} (${member.login})`, member.school);
      this.alertService.alert(AlertTexts.member_created, SnackType.info);
      this.initMember();
      this.getMembers();
    },Error => {
      this.log.aError(Section.Member, `Chyba při tvorbě: ${member.login}`, member.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  sendEmail(member: WTMember, email: string) {
    const emailText =
      '<p>Ahoj, tvé přihlašovací údaje jsou:</p>' +
      '<ul>' +
      '<li>Login: <b>' + member.login + '</b></li>' +
      '<li>Heslo: <b>' + member.pwd + '</b></li>' +
      '</ul>';
    this.httpService.sendMail_post(email, emailText).subscribe(data => {
      this.log.aInfo(Section.Member, `Email poslan pro: ${member.login}`, member.school);
      this.initMember();
    },Error => {
      this.log.aError(Section.Member, `Chyba při posílání emailu: ${member.login}`, member.school, Error);
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
    this.member.login = CommonFunctions.slugify(this.member.name.substr(0,3) + this.member.surname.substr(0, 3));
    this.loginUniqueCheck();
  }

  emailCheck() {
    return (this.email.length === 0) || (this.email.length > 0 && CommonFunctions.ValidateEmail(this.email));
  }

  initMember(){
    this.member = new WTMember(0,'','','', '', '', 1, '', '', false);
    this.email = '';
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
      this.log.aInfo(Section.Member, `Smazán: ${member.name} ${member.surname} (${member.login})`, member.school);
      this.getMembers();
    },Error => {
      this.log.aError(Section.Member, `Chyba při mazání: ${member.login}`, member.school, Error);
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
      this.log.aInfo(Section.Member, `Reset hesla: ${member.name} ${member.surname} (${member.login})`, member.school);
      if(email.length > 0)
        this.sendEmail(member, email);
    },Error => {
      this.log.aError(Section.Member, `Chyba resetování hesla: ${member.login}`, member.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  dialogUpdate(member: WTMember) {
    this.editor = new Editor(member);
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
      for(const info of this.editor.GetChanges()){
        this.log.aInfo(Section.Member, `Upraven: ${member.name} ${member.surname} (${member.login})`, member.school, info);
      }
    },Error => {
      this.log.aError(Section.Member, `Chyba úprav: ${member.login}`, member.school, Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  getMembers() {
    this.showLoading = true;
    this.httpService.getMembers().subscribe(
      (members: WTMember[]) => {
        this.members = members;
        this.dataSource = new MatTableDataSource(this.filterMembers(members));
        this.dataSource.sort = this.eventSort;
        this.showLoading = false;
      },
      (err) => {
        this.log.aError(Section.Member, `Chyba při načítání členů`, undefined, err);
        this.error = err;
        this.showLoading = false;
      }
    );
  }

  filterMembers(members: WTMember[]): WTMember[] {
    if(this.filter === 'all') {
      // show all
    }
    else if(this.filter.length > 0) {
      members = members.filter(
        member =>
          member.login.toLowerCase().includes(this.filter) ||
          member.name.toLowerCase().includes(this.filter) ||
          member.surname.toLowerCase().includes(this.filter) ||
          +member.school === +CommonFunctions.getSchoolCode(this.filter)
      );
    }
    else {
      members.length = 0;
    }
    this.result = members.length;
    return members;
  }
}

class Editor{

  private memberOrig: WTMember;
  private member: WTMember;

  constructor(member: WTMember){
    if(member !== null) {
      this.memberOrig =
        new WTMember(member.id, member.datetime, member.login, member.pwd, member.name, member.surname,
          member.school, member.news, member.logged, member.admin);
      this.member = member;
    }
    else{
      console.log('Null argument.');
    }
  }

  GetChanges(): string[]{
    const arr: string[] = Array();
    const o: WTMember = this.memberOrig;
    const n: WTMember = this.member;
    arr.push(this.eval('Login', o.login, n.login));
    arr.push(this.eval('Jméno', o.name, n.name));
    arr.push(this.eval('Příjmení', o.surname, n.surname));
    arr.push(this.eval('Škola', o.school, n.school));

    const result: string[] = Array();

    for(const element of arr){
      if(element !== undefined)
        result.push(element);
    }
    return result;
  }

  private eval(name: string,propOrig: any, propNew: any, b: boolean = false): string{
    if(propOrig !== propNew){
      if(b){
        return `${name}: ${!!Number(propOrig)} -> ${!!Number(propNew)}`;
      }
      else {
        return `${name}: ${propOrig} -> ${propNew}`;
      }
    }
  }
}

